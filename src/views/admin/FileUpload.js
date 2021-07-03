import React from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core'
import Container from "@material-ui/core/Container";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import StandardHeader from "components/Headers/StandardHeader.js";
import { StyledDropzone } from 'components/StyledDropzone/StyledDropzone';
import { useDropzone } from 'react-dropzone';

function FileUpload() {

    const useStyles = makeStyles(componentStyles);
    const classes = useStyles()
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
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
                        <StyledDropzone></StyledDropzone>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default FileUpload
