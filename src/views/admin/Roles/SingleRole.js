import { Box, Button, Card, CardContent, CardHeader, Container, FilledInput, FormControl, Grid, InputAdornment, makeStyles, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@material-ui/core'
import StandardHeader from 'components/Headers/StandardHeader'
import componentStyles from "assets/theme/views/admin/dashboard.js";
import React, { useState } from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Add, ArrowBack, Create, Delete } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { updateRole } from 'services/roleService';
import { fetchRole } from 'services/roleService';
import { red } from '@material-ui/core/colors';
import Swal from "sweetalert2";
import { removePermissionFromRole } from 'services/roleService';

const SingleRole = () => {

    const useStyles = makeStyles(componentStyles);
    const classes = useStyles();
    const [editable, setEditable] = useState(false);
    const [permissionEditable, setPermissionEditable] = useState(false);
    let { id } = useParams();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const user = useSelector((state) => state.userLogin.userInfo);

    // queries
    const { isLoading, isError, data, error } = useQuery(['role', user?.token, id], fetchRole);

    const roleUpdateMutation = useMutation(updateRole, {
        onSuccess: () => {
        }
    });
    const permissionRemoveMutation = useMutation(removePermissionFromRole, {
        onSuccess: () => {

        },
        onError: (error) => {
            console.log(error);
        },
    });
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handlePermissionDelete = (permission_id) => {
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
                permissionRemoveMutation.mutate(
                    { permission: { permission_id }, token: user?.token, id },
                    {
                        onSuccess: () => {
                            Swal.fire("Deleted!", "Permission has been deleted.", "success");
                        },
                        onError: () =>
                            Swal.fire("Failed!", "Permission has not been deleted.", "error"),
                    }
                );
            }
        });
    }
    // form submission
    const onSubmit = (data) => {
        console.log(data)
        roleUpdateMutation.mutate({ role: data, token: user?.token, id }, {
            onSuccess: () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Role updated successfully'
                })
            },
            onError: () => {
                Toast.fire({
                    icon: 'error',
                    title: 'Role update failed'
                })
            }
        })
    }
    return (
        <div>
            <StandardHeader classes={classes.bgGradientError}>
                <Link to="/app/roles" >
                    <ArrowBack style={{ width: 30, height: "auto", color: "white" }}>

                    </ArrowBack>
                </Link>
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
                        xl={7}
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
                                                Role
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
                                                    className="btn-icon btn-3"
                                                    onClick={() => setEditable(!editable)}
                                                >
                                                    <Box
                                                        component={Create}
                                                        marginRight=".75em"
                                                        top="2px"
                                                        position="relative"
                                                    />
                                                    Edit
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                                classes={{ root: classes.cardHeaderRoot }}
                            ></CardHeader>
                            <CardContent >
                                {isLoading ?
                                    <ClipLoader loading={isLoading} css={override} size={60} /> :
                                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                                        <Grid container>
                                            <Grid item xs={12} lg={12}>
                                                <FormControl
                                                    variant="filled"
                                                    component={Box}
                                                    width="100%"
                                                    marginBottom="1rem!important"
                                                >
                                                    <FilledInput
                                                        autoComplete="off"
                                                        type="text"
                                                        placeholder="Name"
                                                        {...register('name')}
                                                        onInput={({ target: { value } }) => (value)}
                                                        required
                                                        readOnly={!editable}
                                                        defaultValue={"" + data?.name}
                                                        autoFocus
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <AccountCircle />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                                            <Button disabled={!editable} type="submit" color="primary" variant="contained" >
                                                Update
                                            </Button>
                                        </Box>
                                    </form>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        xl={5}
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
                                                    className="btn-icon btn-3"
                                                    onClick={() => setPermissionEditable(!permissionEditable)}
                                                >
                                                    <Box
                                                        component={Create}
                                                        marginRight=".75em"
                                                        top="2px"
                                                        position="relative"
                                                    />
                                                    {/* <span className="btn-inner--icon">
                                                        <i className="ni ni-bag-17" />
                                                    </span> */}
                                                    Edit
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                                classes={{ root: classes.cardHeaderRoot }}
                            ></CardHeader>
                            <CardContent>
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
                                            {data?.permissions && data?.permissions.map(permission =>
                                                <TableRow>
                                                    <TableCell classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }} >
                                                        {permission.id}
                                                    </TableCell>
                                                    <TableCell
                                                        classes={{
                                                            root:
                                                                classes.tableCellRoot +
                                                                " " +
                                                                classes.tableCellRootHead,
                                                        }}
                                                    >
                                                        {permission.name}
                                                    </TableCell>
                                                    <TableCell
                                                        classes={{
                                                            root:
                                                                classes.tableCellRoot +
                                                                " " +
                                                                classes.tableCellRootHead,
                                                        }}
                                                    >
                                                        {permissionEditable && < Delete data-id={permission.id} style={{ color: red[500], cursor: "pointer" }} onClick={() => handlePermissionDelete(permission.id)} ></Delete>}
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Box>
                                    <TableFooter style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button variant="contained"
                                            color="primary" style={{ justifySelf: "flex-end", marginTop: "1em" }} disabled={!permissionEditable}>
                                            <Add />
                                        </Button>
                                    </TableFooter>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default SingleRole
