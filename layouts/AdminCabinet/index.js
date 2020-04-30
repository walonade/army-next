import React, { useRef } from "react";
import AdminPanel from "./../../components/admin/AdminPanel";
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
  const componentRef = useRef();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.drawwer}>
        <AdminPanel printBlog={componentRef}/>
      </div>
      <div className={classes.content}>
        <AppBar />
        <div ref={componentRef}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
