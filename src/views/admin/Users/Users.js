import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import { Box, Card, CardHeader, CardContent, makeStyles, useTheme, Typography, Grid, Button, Container, FormControl, FilledInput, InputAdornment, } from '@material-ui/core';
// import ArrowUpward from '@material-ui/icons/ArrowUpward';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
import StandardHeader from 'components/Headers/StandardHeader';
import { createUser, deleteUser, fetchUsers } from '../../../services/userService'
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners/index'
import { Link } from 'react-router-dom';
import { Add, Delete, Email, Lock, Visibility } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
import ModalForm from 'components/ModalForm/ModalForm';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useForm } from 'react-hook-form';


const useStyles = makeStyles(componentStyles);



const Users = () => {
    // const queryClient = useQueryClient()
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector((state) => state.userLogin.userInfo);
    const { isLoading, isError, data, error, refetch } = useQuery(['users', user?.token], fetchUsers);
    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;
    const deleteMutation = useMutation(deleteUser)
    const createMutation = useMutation(createUser)
    const onSubmit = (data) => {
        createMutation.mutate({ user: data, token: user?.token }, {
            onSuccess: () => {
                reset()
                Toast.fire({
                    icon: 'success',
                    title: 'User created successfully'
                })
                refetch()
            },
            onError: () => {
                reset()
                Toast.fire({
                    icon: 'error',
                    title: 'User creation failed'
                })
            }
        })
    }


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#f44336",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(
                    { token: user?.token, id },
                    {
                        onSuccess: () => {
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                            refetch()
                        },
                        onError: () =>
                            Swal.fire("Failed!", "User has not been deleted.", "error"),
                    }
                );

            }
            if (result.isDismissed) {
                Swal.fire("Canceled!", "User has not been deleted.", "info")
            }
        });
    }
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
                                                Users
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
                                                    onClick={handleClickOpen}
                                                >
                                                    add
                                                    <Box
                                                        component={Add}
                                                        marginRight=".75em"
                                                        top="2px"
                                                        position="relative" />
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
                                                    First Name
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Last Name
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Username
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Email
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
                                                data && data.map((user) =>
                                                    <TableRow key={user?.id}>
                                                        <TableCell>
                                                            {user?.id}
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
                                                            {user?.firstname}
                                                        </TableCell>
                                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                                            {user?.lastname}
                                                        </TableCell>
                                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                                            {user?.username}
                                                        </TableCell>
                                                        <Box
                                                            component={TableCell}
                                                            className={classes.tableCellRoot}
                                                            marginBottom="-2px"
                                                        >
                                                            {user?.email}

                                                        </Box>
                                                        <TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                                            <Link to={"users/" + user?.id} >
                                                                <Visibility style={{ color: green[500] }}></Visibility>
                                                            </Link>
                                                            <Delete style={{ color: red[500], cursor: "pointer" }} onClick={() => handleDelete(user?.id)}></Delete>

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
            <ModalForm open={open} handleClose={handleClose} submit>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="text"
                                    placeholder="First Name"
                                    {...register("firstname")}
                                    onInput={({ target: { value } }) => value}
                                    required

                                    autoFocus
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Last Name"
                                    {...register("lastname")}
                                    required
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

                    <FormControl
                        variant="filled"
                        component={Box}
                        width="100%"
                        marginBottom="1rem!important"
                    >
                        <FilledInput
                            autoComplete="off"
                            type="text"
                            placeholder="Username"
                            {...register("username")}
                            required
                            autoFocus
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl
                        variant="filled"
                        component={Box}
                        width="100%"
                        marginBottom="1rem!important"
                    >
                        <FilledInput
                            autoComplete="off"
                            type="text"
                            placeholder="Email"
                            {...register("email")}
                            onInput={({ target: { value } }) => value}
                            required
                            autoFocus
                            startAdornment={
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* Todo: put this in seperate form */}
                    <FormControl
                        variant="filled"
                        component={Box}
                        width="100%"
                        marginBottom="1rem!important"
                    >
                        <FilledInput
                            autoComplete="off"
                            type="password"
                            placeholder="Password"
                            required
                            {...register("password")}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box
                        textAlign="center"
                        marginTop="1.5rem"
                        marginBottom="1.5rem"
                    >
                    </Box>
                    <Button
                        color="primary" type="submit" contained>
                        Submit
                    </Button>
                </form>
            </ModalForm>
        </>
    )
}

export default Users
