import { IconButton, Dialog, DialogActions, DialogContent, Slide, Button, makeStyles, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import componentStyles from "assets/theme/components/dialog.js";
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { createDocument } from 'services/documentService';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export function DropzoneDialog(props) {
    const [files, setFiles] = useState([]);
    const [filesAvailable, setFilesAvaillable] = useState(false);
    const dialogStyles = makeStyles(componentStyles);
    const classes = dialogStyles()

    // Effects
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
        setFilesAvaillable(files.length > 0 ? true : false)
    }, [files]);


    useEffect(() => {
        if (!props.open) {
            setFiles([])
            setFilesAvaillable(false)
        }
    }, [props.open, files.length])

    const user = useSelector(state => state.userLogin.userInfo)
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: ['image/*', 'application/pdf'],
        onDrop: acceptedFiles => {
            if (acceptedFiles.length > 1)
                return
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
            ))
        }
    });
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));
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
    const queryClient = useQueryClient()
    const uploadFileMutation = useMutation(createDocument)
    const uploadFile = () => {
        uploadFileMutation.mutate({ document: files[0], token: user?.token }, {
            onSuccess: () => {
                Toast.fire({
                    icon: 'success',
                    title: 'Document uploaded successfully'
                });
                queryClient.invalidateQueries('documents')
                props.refetch()
                props.handleClose()
            }, onError: () => {
                Toast.fire({
                    icon: 'error',
                    title: 'Document upload failed'
                })
                props.handleClose()
            }
        })
    }
    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div className={classes.dialogHeader}>
                <Typography
                    variant="h5"
                    component="h5"
                    className={classes.dialogTitle}
                >
                    Add File
                </Typography>
                <IconButton onClick={props.handleClose}>
                    <Clear />
                </IconButton>
            </div>
            <DialogContent>
                <img style={
                    { display: "block", margin: "1em auto" }

                } width={150} src={require("assets/img/icons/undraw_Upload_re_pasx.svg").default} alt="" />
                <div className="container">
                    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </Container>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary" variant="contained">
                    Cancel
                </Button>
                <Button onClick={uploadFile} disabled={!filesAvailable} color="primary" variant="contained">
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}

