import { Box, Button, Card, CardContent, CardHeader, Container, FilledInput, FormControl, Grid, InputAdornment, makeStyles, Typography } from '@material-ui/core'
import StandardHeader from 'components/Headers/StandardHeader'
import componentStyles from "assets/theme/views/admin/dashboard.js";
import React, { useState } from 'react'
import Email from '@material-ui/icons/Email';
import Lock from '@material-ui/icons/Lock';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Create } from '@material-ui/icons';
// import { Grain } from '@material-ui/icons/';

const SingleUser = () => {

    const useStyles = makeStyles(componentStyles);
    const classes = useStyles();
    const [editable, setEditable] = useState(false);
    return (
        <div>
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
                        xl={8}
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
                                                    color="warning"
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
                            <CardContent >
                                <form action="">
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
                                                    onInput={({ target: { value } }) => (value)}
                                                    required
                                                    disabled={!editable}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} lg={6}><FormControl
                                            variant="filled"
                                            component={Box}
                                            width="100%"
                                            marginBottom="1rem!important"
                                        >
                                            <FilledInput
                                                autoComplete="off"
                                                type="text"
                                                placeholder="Last Name"
                                                onInput={({ target: { value } }) => (value)}
                                                required
                                                disabled={!editable}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl></Grid>

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
                                            onInput={({ target: { value } }) => (value)}
                                            required
                                            disabled={!editable}
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
                                            onInput={({ target: { value } }) => (value)}
                                            required
                                            disabled={!editable}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Email />
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
                                            placeholder="Password"
                                            onInput={({ target: { value } }) => (value)}
                                            required
                                            disabled={!editable}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Lock />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                                        <Button disabled={!editable} type="submit" color="primary" variant="contained" >
                                            Update
                                        </Button>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default SingleUser
