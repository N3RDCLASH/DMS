import React, { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Container from "@material-ui/core/Container";
import StandardHeader from "components/Headers/StandardHeader.js";
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Add, CloudDownload, Delete, Visibility } from '@material-ui/icons';
import { green, red, yellow } from '@material-ui/core/colors';
import { useMutation, useQuery } from 'react-query';
import { css } from '@emotion/react';
import { fetchDocumentsByUser } from 'services/documentService';
import componentStyles1 from "assets/theme/views/admin/dashboard.js";
import { DropzoneDialog } from 'components/StyledDropzone/DropzoneDialog';
import { deleteDocument } from 'services/documentService';
import Swal from 'sweetalert2';
import { downloadDocument } from 'services/documentService';
// import { Alert, AlertTitle } from '@material-ui/lab';



function Documents() {
    const [documentID, setDocumentID] = useState()
    const dashboardStyles = makeStyles(componentStyles1);
    const classes = dashboardStyles()
    const user = useSelector((state) => state.userLogin.userInfo);
    const { isLoading, isError, data, error, refetch, isSuccess } = useQuery(['documents', user?.token, user?.id], fetchDocumentsByUser);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: #5e72e4;
    `;
    const swalConfig = {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteMutation = useMutation(deleteDocument)
    const handleDelete = (id) => {
        Swal.fire(swalConfig).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(
                    { token: user?.token, id },
                    {
                        onSuccess: () => {
                            Swal.fire("Deleted!", "Document has been deleted.", "success");
                            refetch()
                        },
                        onError: () =>
                            Swal.fire("Failed!", "Document has not been deleted.", "error"),
                    }
                );
            }
            if (result.isDismissed) {
                Swal.fire("Canceled!", "Document has not been deleted.", "info")
            }
        });
    }
    const downloadMutation = useMutation(downloadDocument);
    const downloadFile = (id) => {
        downloadMutation.mutate({ token: user?.token, id }, {
            onSuccess: data => {
                console.log(data)
                const link = document.createElement('a')
                link.href = data.url;
                link.setAttribute('download', data.filename);
                document.body.appendChild(link);
                link.click();
            }
            // document.body.removeChild(link)

        })
    }
    const saveDocument = (downloadedFile) => {

    }



    return (
        <>
            <StandardHeader classes={classes.bgGradientError}>
            </StandardHeader>
            <Container
                maxWidth={false}
                component={Box}
                paddingTop="3em"
                classes={{ root: classes.containerRoot }}
            > <Grid container>
                    <Grid
                        item
                        xs={12}
                        xl={12}
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
                                                Documents
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
                                                    onClick={handleClickOpen}
                                                    style={{ textAlign: "center" }}
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
                                                    Name
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Owner
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Last Modified
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    File Size
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
                                            {isLoading && !isSuccess ?
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        <ClipLoader loading={isLoading} css={override} size={60} />

                                                    </TableCell>
                                                </TableRow> :
                                                isSuccess && data && data.map((document) =>
                                                    document &&
                                                    <TableRow key={document?.id}>
                                                        <TableCell>
                                                            {document?.id}
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
                                                            {document?.file.split("\\")[1]}
                                                        </TableCell>
                                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                                            {user?.firstname + ' ' + user?.lastname}
                                                        </TableCell>
                                                        <TableCell classes={{ root: classes.tableCellRoot }}>
                                                            {Date(document?.updated_at) ?? Date(document?.created_at)}
                                                        </TableCell>
                                                        <Box
                                                            component={TableCell}
                                                            className={classes.tableCellRoot}
                                                            marginBottom="-2px"
                                                        >
                                                            {document?.email}

                                                        </Box>
                                                        <TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                                            <Link to={"documents/" + document?.id} style={{ margin: "0 5px" }} >
                                                                <Visibility style={{ color: green[500] }}></Visibility>
                                                            </Link>
                                                            <Delete style={{ color: red[500], margin: "0 5px", cursor: "pointer" }} onClick={() => handleDelete(document.id)}></Delete>
                                                            <CloudDownload style={{ color: yellow[500], margin: "0 5px", cursor: "pointer" }} onClick={() => downloadFile(document.id)} ></CloudDownload>

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
            <DropzoneDialog open={open} handleClose={handleClose} refetch={refetch}></DropzoneDialog>
        </>
    )
}

export default Documents
