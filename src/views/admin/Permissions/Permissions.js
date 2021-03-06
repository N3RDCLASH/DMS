import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import componentStyles from "assets/theme/views/admin/dashboard.js";
import { Box, Card, CardHeader, CardContent, makeStyles, useTheme, Typography, Grid, Button, Container } from '@material-ui/core';
import StandardHeader from 'components/Headers/StandardHeader';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners/index'
import { Link } from 'react-router-dom';
import { Visibility } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { fetchPermissions } from 'services/permissionService';


const useStyles = makeStyles(componentStyles);


const Permissions = () => {
    // const queryClient = useQueryClient()
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector((state) => state.userLogin.userInfo);
    const { isLoading, isError, data, error } = useQuery(['permissions', user?.token], fetchPermissions);

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;
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
                                                Permissions
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
                                                    Permission
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
                                                data && data.map((permission) =>
                                                    <TableRow key={permission?.id}>
                                                        <TableCell>
                                                            {permission?.id}
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
                                                            {permission?.name}
                                                        </TableCell>
                                                        <TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                                            <Link to={"permissions/" + permission?.id} >
                                                                <Visibility style={{ color: green[500] }}></Visibility>
                                                            </Link>
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

export default Permissions
