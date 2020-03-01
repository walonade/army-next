import React, { Fragment } from "react";
import CabinetLayout from "./../../../layouts/Cabinet";
import { Grid } from "@material-ui/core";
import DayTableOne from "./../../../components/DayTableOne";
import DayTableTwo from "./../../../components/DayTableTwo";
import WeekTable from "./../../../components/WeekTable";
import MonthTable from "./../../../components/MonthTable";
import { withAuthSync } from "./../../../utils/auth.js";
import Link from "next/link";
const Table = () => {
  return (
    <Fragment>
      <DayTableOne />
      <DayTableTwo />
      <WeekTable />
      <MonthTable />
    </Fragment>
  );
};
Table.Layout = CabinetLayout;
export default withAuthSync(Table);
