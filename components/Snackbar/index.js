import React, { Fragment } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import withStore from "./../../utils/withStore.js";
const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
export default withStore(props => {
  return (
    <Fragment>
      {props.store.NotificationStore.list.map((node, index) => (
        <Snackbar
          key={node.id}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={node.show}
          autoHideDuration={6000}
          onClose={props.store.NotificationStore.optimazeRemove[index]}
        >
          <Alert
            onClose={props.store.NotificationStore.optimazeRemove[index]}
            severity={node.type}
          >
            {node.message}
          </Alert>
        </Snackbar>
      ))}
    </Fragment>
  );
});
