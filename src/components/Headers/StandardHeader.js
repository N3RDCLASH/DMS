import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import componentStyles from "assets/theme/components/header.js";


const useStyles = makeStyles(componentStyles);

const StandardHeader = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.header + " " + props.classes}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <div>
            {props.children ? props.children : null}
          </div>
        </Container>
      </div>
    </>
  );
};

export default StandardHeader;
