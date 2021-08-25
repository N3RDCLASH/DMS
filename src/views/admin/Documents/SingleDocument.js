import React, { useEffect } from 'react'
import { Box, Card, CardContent, CardHeader, Grid, makeStyles, Typography } from '@material-ui/core'
import Container from "@material-ui/core/Container";
import StandardHeader from "components/Headers/StandardHeader.js";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { } from '@material-ui/core/colors';
import { css } from '@emotion/react';
import { downloadDocument } from 'services/documentService';
import componentStyles1 from "assets/theme/views/admin/dashboard.js";
// import Swal from 'sweetalert2';
import DocViewer, { DocViewerRenderers, } from 'react-doc-viewer';
import { useMutation } from 'react-query';



function SingleDocument() {
    const dashboardStyles = makeStyles(componentStyles1);
    const classes = dashboardStyles()
    const user = useSelector((state) => state.userLogin.userInfo);
    const { id } = useParams();
    const { data, refetch: refetchDownload, isSuccess, mutate } = useMutation(downloadDocument);

    useEffect(() => { mutate({ token: user?.token, id }) }, [])
    // mutate({ token: user?.token, id })
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;


    // const CustomRenderer = ({
    //     mainState: { currentDocument },
    // }) => {
    //     if (!currentDocument) return null;

    //     return (
    //         <div id="my-png-renderer">
    //             <img id="png-img" src={currentDocument.fileData} />
    //         </div>
    //     );
    // };

    // CustomRenderer.fileLoader = ({
    //     documentURI,
    //     signal,
    //     fileLoaderComplete,
    // }) => {
    //     myCustomFileLoaderCode().then(async () => {
    //         // Whenever you have finished you must call fileLoaderComplete() to remove the loading animation
    //         const fileReader = new FileReader();
    //         fileReader.addEventListener('loadend', () => {
    //             fileLoaderComplete(fileReader);
    //         })

    //         // example of file loaded as blob with axios.
    //         const response = await axios.get('https://placekitten.com/200/300', {
    //             responseType: 'blob',
    //         });
    //         fileReader.readAsDataUrl(response.data);
    //     });
    // };
    const [docs, setDocs] = React.useState([]);
    useEffect(() => {
        if (isSuccess) {
            console.log(data)
            setDocs([{ uri: data?.url, }])
        }
        console.log(docs)
    }, [data])

    return (
        <>
            <StandardHeader classes={classes.bgGradientError}>
                <Link to="/app/documents">
                    <ArrowBack
                        style={{ width: 30, height: "auto", color: "white" }}
                    ></ArrowBack>
                </Link>
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
                                                Document
                                            </Box>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Box
                                                justifyContent="flex-end"
                                                display="flex"
                                                flexWrap="wrap"
                                            >
                                            </Box>
                                        </Grid>
                                    </Grid>
                                }
                                classes={{ root: classes.cardHeaderRoot }}
                            ></CardHeader>
                            <CardContent>
                                <DocViewer documents={docs} pluginRenderers={[DocViewerRenderers]} />
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SingleDocument
