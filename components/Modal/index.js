import React from "react";
import { Modal, Fade, Backdrop } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
export default props => {
  const classes = useStyle();
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.in}>
        <div className={classes.paper}>{props.children}</div>
      </Fade>
    </Modal>
  );
};
