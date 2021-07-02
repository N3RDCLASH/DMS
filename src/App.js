import React from "react";
import { BrowserRouter, Route, Switch, } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import { ProtectedContainer } from 'components/ProtectedContainer/ProtectedContainer'




const App = () => {

    return (
        <>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <BrowserRouter>
                    <Switch>
                        <ProtectedContainer>
                            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                        </ProtectedContainer>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App