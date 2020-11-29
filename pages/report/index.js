import React, { Fragment } from "react"
import CabinetLayout from "../../layouts/Cabinet"
import DayTableOne from "../../components/DayTableOne"
import DayTableTwo from "../../components/DayTableTwo"
import WeekTable from "../../components/WeekTable"
import MonthTable from "../../components/MonthTable"
import Head from "next/head"
import { withAuthSync } from "../../utils/auth.js"
import withStore from "../../utils/withStore.js"
const Table = props => {
 let component
 if (props.store.gapDate == 0) {
  component = (
   <Fragment>
    <DayTableOne />
    <DayTableTwo />
   </Fragment>
  )
 } else if (props.store.gapDate > 0 && props.store.gapDate <= 7) {
  component = <WeekTable />
 } else {
  component = <MonthTable />
 }
 return <>
    <Head>
        <title>Отчёт</title>
    </Head>
    {component}
 </>
}
Table.Layout = CabinetLayout
export default withAuthSync(withStore(Table))
