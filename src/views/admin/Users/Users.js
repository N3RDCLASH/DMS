import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import componentStyles from "assets/theme/views/admin/dashboard.js";
import { Box, Card, CardHeader, CardContent, makeStyles, useTheme, Typography, Grid, Button, Container } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
import StandardHeader from 'components/Headers/StandardHeader';


const useStyles = makeStyles(componentStyles);


const Users = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <><StandardHeader classes={classes.bgGradientError}>
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
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Page name
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Visitors
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Unique users
                                                </TableCell>
                                                <TableCell
                                                    classes={{
                                                        root:
                                                            classes.tableCellRoot +
                                                            " " +
                                                            classes.tableCellRootHead,
                                                    }}
                                                >
                                                    Bounce rate
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
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
                                                    /argon/
                                                </TableCell>
                                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                                    4,569
                                                </TableCell>
                                                <TableCell classes={{ root: classes.tableCellRoot }}>
                                                    340
                                                </TableCell>
                                                <Box
                                                    component={TableCell}
                                                    className={classes.tableCellRoot}
                                                    marginBottom="-2px"
                                                >
                                                    <Box
                                                        component={ArrowUpward}
                                                        width="1rem!important"
                                                        height="1rem!important"
                                                        marginRight="1rem"
                                                        color={theme.palette.success.main}
                                                    />
                                                    46,53%
                                                </Box>
                                            </TableRow>
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

export default Users
