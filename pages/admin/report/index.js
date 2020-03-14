import React, { Fragment } from "react";
import CabinetLayout from "./../../../layouts/AdminCabinet";
import { Grid } from "@material-ui/core";
import DayTableOne from "./../../../components/DayTableOne";
import DayTableTwo from "./../../../components/DayTableTwo";
import WeekTable from "./../../../components/WeekTable";
import MonthTable from "./../../../components/MonthTable";
import { withAuthSync } from "./../../../utils/auth.js";
import withStore from "./../../../utils/withStore.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})
const Table = props => {
  const classes = useStyles()
  let component;
  if (props.store.gapDate == 0) {
    component = (
      <Fragment>
        <DayTableOne />
        <DayTableTwo />
      </Fragment>
    );
  } else if (props.store.gapDate > 0 && props.store.gapDate <= 7) {
    component = <WeekTable />;
  } else {
    component = <MonthTable />;
  }
  return <div className={classes.container}>{component}</div>;;
};
Table.Layout = CabinetLayout;
export default withAuthSync(withStore(Table), true);
