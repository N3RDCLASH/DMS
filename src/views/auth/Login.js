import { React, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

// core components
import componentStyles from "assets/theme/views/auth/login.js";
import { login } from "actions/userActions";
import { css } from "@emotion/react";
import { useHistory } from "react-router-dom";
// import { useIsAuthtenticated } from "hooks/useIsAuthenticated";
// import { Redirect } from "react-router-dom";
const useStyles = makeStyles(componentStyles);


function Login() {
  const classes = useStyles();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const history = useHistory()
  const { loading, error, userInfo } = userLogin;
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: #5e72e4;
`;
  let schema = yup.object().shape({
    email: yup.string().required('Voer email in.').trim(' '),
    password: yup.string().required('Voer password in.')
  });
  useEffect(() => {
    return () => {

    }
  }, [loading, error, userInfo])

  const submitForm = () => {
    console.log(dispatch(login(email, password)))
  }
  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader
            className={classes.cardHeader}
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
            title={<h1>Login</h1>}
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <Box>
              <img style={
                { display: "block", margin: "0 auto" }

              } width={100} height="100" src={require("assets/img/icons/qualogy.svg").default} alt="" />
            </Box>
            {loading ? <ClipLoader loading={loading} css={override} size={60} /> :
              <form action="" onSubmit={handleSubmit(submitForm)}>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="email"
                    placeholder="Email"
                    onInput={({ target: { value } }) => setEmail(value)}
                    required
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
                    type="password"
                    placeholder="Password"
                    onInput={({ target: { value } }) => setPassword(value)}
                    required
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label="Remeber me"
                  labelPlacement="end"
                  classes={{
                    root: classes.formControlLabelRoot,
                    label: classes.formControlLabelLabel,
                  }}
                />
                <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                  <Button type="submit" color="primary" variant="contained" >
                    Sign in
                  </Button>
                </Box>
              </form>}
          </CardContent>
        </Card>
        <Grid container component={Box} marginTop="1rem">
          <Grid item xs={6} component={Box} textAlign="left">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Forgot password
            </a>
          </Grid>
          <Grid item xs={6} component={Box} textAlign="right">
            <a
              href="#admui"
              onClick={(e) => e.preventDefault()}
              className={classes.footerLinks}
            >
              Create new account
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
