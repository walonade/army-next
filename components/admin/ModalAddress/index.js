import Modal from "./../../Modal";
import { TextField, Button, Typography } from "@material-ui/core";
const fixStyleMap = { height: 500, width: 700 };
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  float: {
    float: "right"
  }
});
export default props => {
  const classes = useStyle();
  return (
    <Modal open={props.open} onClose={props.onClose} in={props.in}>
      <div className={classes.flex}>
        <Typography>lat: {`fgrgr`}</Typography>
        <Typography>lng: {`efge`}</Typography>
      </div>
      <div>
      </div>
      <Button className={classes.float} color="primary">
        Сохранить
      </Button>
    </Modal>
  );
};
