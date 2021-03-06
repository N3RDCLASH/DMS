import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FilledInput,
    FormControl,
    Grid,
    InputAdornment,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import StandardHeader from "components/Headers/StandardHeader";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import React, { useState } from "react";
import Email from "@material-ui/icons/Email";
// import Lock from '@material-ui/icons/Lock';
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Add, ArrowBack, Create, Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { fetchUser } from "services/userService";
import { useForm } from "react-hook-form";
import { updateUser } from "services/userService";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { red } from "@material-ui/core/colors";
import Swal from "sweetalert2";
import { removeRoleFromUser } from "services/userService";
import ModalForm from "components/ModalForm/ModalForm";
import useHasPermission from "hooks/useHasPermission";
import CheckBoxForm from "components/CheckBoxForm/CheckBoxForm";
import { fetchRoles } from "services/roleService";
import { addRolesToUser } from "services/userService";

const SingleUser = () => {
    const useStyles = makeStyles(componentStyles);
    const classes = useStyles();
    const [roleEditable, setRoleEditable] = useState(false);
    const [editable, setEditable] = useState(false);
    const [roleModalOpen, setRoleModalOpen] = useState(false)
    let { id } = useParams();
    const hasPermission = useHasPermission()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const user = useSelector((state) => state.userLogin.userInfo);

    // queries
    const { isLoading, isError, data, error, refetch } = useQuery(
        ["users", user?.token, id],
        fetchUser
    );
    const { data: roles } = useQuery(
        ["roles", user?.token],
        fetchRoles
    );
    const userUpdateMutation = useMutation(updateUser, {
        onSuccess: () => {
            Toast.fire({
                icon: 'success',
                title: 'User updated successfully'
            });
            refetch()
        },
        onError: () => {
            Toast.fire({
                icon: 'error',
                title: 'User update failed'
            });
        }
    });
    const addRolesMutation = useMutation(addRolesToUser)
    const roleRemoveMutation = useMutation(removeRoleFromUser, {
        onSuccess: () => { },
        onError: (error) => {
            console.log(error);
        },
    });
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
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5e72e4;
  `;
    const handleClose = () => { setRoleModalOpen(false) }

    // form submission
    const onSubmit = (data) => {
        console.log(data);
        userUpdateMutation.mutate({ user: data, token: user?.token, id });
    };
    const handleAddRoles = (roles) => {
        addRolesMutation.mutate({ roles, token: user?.token, id }, { onError: () => { } })
    }
    const handleDeleteRole = (role_id) => {
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
                roleRemoveMutation.mutate(
                    { role: { role_id }, token: user?.token, id },
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
        });
    };

    return (
        <>
            <div>
                <StandardHeader classes={classes.bgGradientError}>
                    <Link to="/app/users">
                        <ArrowBack
                            style={{ width: 30, height: "auto", color: "white" }}
                        ></ArrowBack>
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
                            xl={8}
                            component={Box}
                            marginBottom="3rem!important"
                            classes={{ root: classes.gridItemRoot }}
                        >
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
                                                    User
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
                                <CardContent>
                                    {isLoading ? (
                                        <ClipLoader loading={isLoading} css={override} size={60} />
                                    ) : (
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
                                                            readOnly={!editable}
                                                            defaultValue={"" + data?.firstname}
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
                                                            onInput={({ target: { value } }) => value}
                                                            required
                                                            readOnly={!editable}
                                                            defaultValue={"" + data?.lastname}
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
                                                    onInput={({ target: { value } }) => value}
                                                    required
                                                    readOnly={!editable}
                                                    defaultValue={"" + data?.username}
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
                                                    disabled
                                                    defaultValue={"" + data?.email}
                                                    autoFocus
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <Email />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            {/* Todo: put this in seperate form */}
                                            {/* <FormControl
                                        variant="filled"
                                        component={Box}
                                        width="100%"
                                        marginBottom="1rem!important"
                                        >
                                        <FilledInput
                                        autoComplete="off"
                                            type="text"
                                            placeholder="Password"
                                            onInput={({ target: { value } }) => (value)}
                                            required
                                            readOnly={!editable}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                <Lock />
                                                    </InputAdornment>
                                            }
                                            />
                                        </FormControl> */}
                                            <Box
                                                textAlign="center"
                                                marginTop="1.5rem"
                                                marginBottom="1.5rem"
                                            >
                                                <Button
                                                    disabled={!editable}
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            xl={4}
                            component={Box}
                            marginBottom="3rem!important"
                            classes={{ root: classes.gridItemRoot }}
                        >
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
                                                        onClick={() => setRoleEditable(!roleEditable)}
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
                                                    <TableCell
                                                        classes={{
                                                            root:
                                                                classes.tableCellRoot +
                                                                " " +
                                                                classes.tableCellRootHead,
                                                        }}
                                                    >
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
                                                    ></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.roles &&
                                                    data?.roles.map((role) => (
                                                        <TableRow key={role.id}>
                                                            <TableCell
                                                                classes={{
                                                                    root:
                                                                        classes.tableCellRoot +
                                                                        " " +
                                                                        classes.tableCellRootHead,
                                                                }}
                                                            >
                                                                {role.id}
                                                            </TableCell>
                                                            <TableCell
                                                                classes={{
                                                                    root:
                                                                        classes.tableCellRoot +
                                                                        " " +
                                                                        classes.tableCellRootHead,
                                                                }}
                                                            >
                                                                {role.name}
                                                            </TableCell>
                                                            <TableCell
                                                                classes={{
                                                                    root:
                                                                        classes.tableCellRoot +
                                                                        " " +
                                                                        classes.tableCellRootHead,
                                                                }}
                                                            >
                                                                {roleEditable && (
                                                                    <Delete
                                                                        data-id={role.id}
                                                                        style={{ color: red[500], cursor: "pointer" }}
                                                                        onClick={() => handleDeleteRole(role.id)}
                                                                    ></Delete>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Box>
                                        <TableFooter
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ justifySelf: "flex-end", marginTop: "1em" }}
                                                disabled={!roleEditable}
                                                onClick={() => setRoleModalOpen(!roleModalOpen)}
                                            >
                                                <Add></Add>
                                            </Button>
                                        </TableFooter>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                < ModalForm headerText="Roles" open={roleModalOpen} handleClose={handleClose} submit={handleAddRoles}>
                    <CheckBoxForm items={roles} initialValues={data?.roles}></CheckBoxForm>
                </ModalForm>
            </div>
        </>
    );
};

export default SingleUser;
