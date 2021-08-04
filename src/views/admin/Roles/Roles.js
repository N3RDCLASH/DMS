import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import { Box, Card, CardHeader, CardContent, makeStyles, useTheme, Typography, Grid, Button, Container } from '@material-ui/core';
// import ArrowUpward from '@material-ui/icons/ArrowUpward';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
import StandardHeader from 'components/Headers/StandardHeader';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners/index'
import { Link } from 'react-router-dom';
import { fetchRoles } from 'services/roleService';
import { Delete, Visibility } from '@material-ui/icons';
import { green, red, } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
import { deleteRole } from 'services/roleService';


const useStyles = makeStyles(componentStyles);


const Roles = () => {
    // const queryClient = useQueryClient()
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector((state) => state.userLogin.userInfo);
    const { isLoading, isError, data, error, refetch } = useQuery(['roles', user?.token], fetchRoles);

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;

    const deleteMutation = useMutation(deleteRole)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(
                    { token: user?.token, id },
                    {
                        onSuccess: () => {
                            Swal.fire("Deleted!", "Role has been deleted.", "success");
                            refetch()
                        },
                        onError: () =>
                            Swal.fire("Failed!", "Role has not been deleted.", "error"),
                    }
                );
            }
            if (result.isDismissed) {
                Swal.fire("Canceled!", "Role has not been deleted.", "info")
            }
        });
    }
    return (
        <>

            <StandardHeader classes={classes.bgGradientError}>
            </StandardHeader>
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: classes.containerRoot }}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        xl={12}
                        component={Box}
                        marginBottom="3rem!important"
                        classes={{ root: classes.gridItemRoot }}>
                        <Card>
                            <CardHeader
                                subheader={
                                    <Grid
                                        container
                                        component={Box}
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs="auto">
                                            <Box
                                                component={Typography}
                                                variant="h3"
                                                marginBottom="0!important"
                                            >
                                                Roles
                                            </Box>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Box
                                                justifyContent="flex-end"
                                                display="flex"
                                                flexWrap="wrap"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                >
                                                    See all
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                                classes={{ root: classes.cardHeaderRoot }}
                            ></CardHeader>
                            <CardContent >
                                <TableContainer>
                                    <Box
                                        component={Table}
                                        alignItems="center"
                                        marginBottom="0!important"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell classes={{
                                                    root:
                                                        classes.tableCellRoot +
                                                        " " +
                                                        classes.tableCellRootHead,
                                                }} >
                                                    ID
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Role
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {isLoading ?
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        <ClipLoader loading={isLoading} css={override} size={60} />

                                                    </TableCell>
                                                </TableRow> :
                                                data && data.map((role) =>
                                                    <TableRow key={role?.id}>
                                                        <TableCell>
                                                            {role?.id}
                                                        </TableCell>
                                                        <TableCell
                                                            classes={{
                                                                root:
                                                                    classes.tableCellRoot +
                                                                    " " +
                                                                    classes.tableCellRootBodyHead,
                                                            }}
                                                            component="th"
                                                            variant="head"
                                                            scope="row"
                                                        >
                                                            {role?.name}
                                                        </TableCell>
                                                        <TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                                            <Link to={"roles/" + role?.id} >
                                                                <Visibility style={{ color: green[500] }}></Visibility>
                                                            </Link>
                                                            <Delete style={{ color: red[500], cursor: "pointer" }} onClick={() => handleDelete(role?.id)}></Delete>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Box>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Roles
