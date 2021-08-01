import { Box, Card, CardContent, CardHeader, Container, FilledInput, FormControl, Grid, InputAdornment, makeStyles, Typography } from '@material-ui/core'
import StandardHeader from 'components/Headers/StandardHeader'
import componentStyles from "assets/theme/views/admin/dashboard.js";
import React from 'react'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ArrowBack } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { fetchPermission } from 'services/permissionService';

const SinglePermission = () => {

    const useStyles = makeStyles(componentStyles);
    const classes = useStyles();
    let { id } = useParams();

    const user = useSelector((state) => state.userLogin.userInfo);

    // queries
    const { isLoading, isError, data, error } = useQuery(['permission', user?.token, id], fetchPermission);
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;
    return (
        <div>
            <StandardHeader classes={classes.bgGradientError}>
                <Link to="/app/permissions" >
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
                                                Permission
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
                            <CardContent >
                                {isLoading ?
                                    <ClipLoader loading={isLoading} css={override} size={60} /> :
                                    <form action="" >
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
                                                        onInput={({ target: { value } }) => (value)}
                                                        required
                                                        readOnly={true}
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
                                    </form>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default SinglePermission
