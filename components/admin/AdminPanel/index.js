import React, { Fragment, useCallback } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Button} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import withStore from "./../../../utils/withStore";
import DatePicker from "./../../DatePicker";
const useStyle = makeStyles({
  formControl: {
    minWidth: 250
  },
  button: {
    width: 250,
    marginTop: 20,
    marginBottom: 20
  }
});
const AdminPanel = props => {
  const classes = useStyle();
  const handleChangeDateFrom = useCallback(date => {
    if (date > props.store.toDate) return;
    props.store.setFromDate(moment(date));
  });
  const handleChangeDateTo = useCallback(date => {
    if (date < props.store.fromDate) return;
    props.store.setToDate(moment(date));
  });
  const updateList = useCallback(() => props.store.CrimeStore.getCrimes());
  return (
    <Fragment>
      <Grid container justify="center">
        <Typography variant="h4">Logo</Typography>
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid container justify="center">
        <Typography variant="h6">Сформировать статистику</Typography>
      </Grid>
      <br />
      <Grid container justify="space-around">
        <DatePicker
          className={classes.formControl}
          label="От"
          max={props.store.toDate}
          value={props.store.fromDate}
          onChange={handleChangeDateFrom}
        />
        <DatePicker
          className={classes.formControl}
          label="До"
          min={props.store.fromDate}
          value={props.store.toDate}
          onChange={handleChangeDateTo}
        />
      </Grid>
      <Grid container justify="center">
        <Button
          onClick={updateList}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <DescriptionIcon />
        </Button>
      </Grid>
      <Divider />
    </Fragment>
  );
};
export default withStore(AdminPanel);
