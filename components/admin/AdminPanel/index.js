import React, { Fragment, useCallback } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, IconButton } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import withStore from "./../../../utils/withStore";
import DatePicker from "./../../DatePicker";
const useStyle = makeStyles({
  formControl: {
    minWidth: 250
  }
});
const AdminPanel = props => {
  const classes = useStyle();
  const handleChangeDateFrom = useCallback(date => {
    if (date > dateTo) return;
    props.store.setFromDate(moment(date));
  });
  const handleChangeDateTo = useCallback(date => {
    if (date < dateFrom) return;
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
      <Grid container justify="flex-end">
        <IconButton onClick={updateList}>
          <DescriptionIcon />
        </IconButton>
      </Grid>
      <Divider />
    </Fragment>
  );
};
export default withStore(AdminPanel);
