import React, { useRef } from "react";
import Panel from "./../../components/Panel";
import AppBar from "./../../components/AppBar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  drawwer: {
    width: 300,
    borderRight: "1px solid #DCDCDC"
  },
  content: {
    flexGrow: 1
  }
});
export default props => {
  const classes = useStyles();
  const componentRef = useRef();
  return (
    <div className={classes.root}>
      <div className={classes.drawwer}>
        <Panel printBlog={componentRef}/>
      </div>
      <div className={classes.content}>
        <AppBar/>
        <div
          ref={componentRef}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
