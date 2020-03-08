import React, { Fragment } from "react";
import CabinetLayout from "./../../../layouts/Cabinet";
import { Grid } from "@material-ui/core";
import DayTableOne from "./../../../components/DayTableOne";
import DayTableTwo from "./../../../components/DayTableTwo";
import WeekTable from "./../../../components/WeekTable";
import MonthTable from "./../../../components/MonthTable";
import { withAuthSync } from "./../../../utils/auth.js";
import withStore from "./../../../utils/withStore.js";
import Link from "next/link";
const Table = props => {
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
  return <Fragment>{component}</Fragment>;
};
Table.Layout = CabinetLayout;
export default withAuthSync(withStore(Table));
