import React, { useMemo, useEffect } from "react"
import {
 Table,
 TableCell,
 TableRow,
 TableBody,
 TableFooter,
 TableContainer,
 Paper,
 Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MyTableHead from "./../TableHead"
import withStore from "./../../utils/withStore.js"
import moment from "moment"
import { timeofCrimes } from "./../../data"
const useStyles = makeStyles({
    root: {
        width: "calc(100vw - 360px)",
        float: "right",
        marginRight: 10,
        marginTop: 10,
        marginBottom: 30
    },
    table: {
        marginTop: 20,
        marginBottom: 20
    }
})
export default withStore(props => {
 const {crimesList} = props.store.SistemDataStore.sistemData
 const classes = useStyles()
 let list = props.store.CrimeStore.updatedCrimes
 const { isPrint } = props.store
 const setCrime = (fromTime, toTime, crime) => {
  let crimeCount = 0
  const fromTF = moment(fromTime, "HH:mm")
  const toTF = moment(toTime, "HH:mm")
  list.forEach(item => {
   const itTF = moment(item.compTime, "HH:mm")
   if (item.type === crime) {
    if (fromTF <= itTF && itTF < toTF) crimeCount = crimeCount + 1
   }
  })
  return crimeCount
 }
 const setCrimeFull = (fromTime, toTime) => {
  let crimeCount = 0
  let crimePercent = 0
  let crimeFalsy = 0
  let crimeFalsyPercent = 0
  let crimeTrufyPercent = 0
  const fromTF = moment(fromTime, "HH:mm")
  const toTF = moment(toTime, "HH:mm")
  list.forEach(item => {
   const itTF = moment(item.compTime, "HH:mm")
   if (fromTF <= itTF && itTF < toTF) {
    crimeCount = crimeCount + 1
    crimePercent = Math.floor((crimeCount / list.length) * 100)
    if (item.service === "не раскрыто") {
     crimeFalsy = crimeFalsy + 1
     crimeFalsyPercent = Math.floor((crimeFalsy / crimeCount) * 100)
    } else {
     crimeTrufyPercent = 100 - crimeFalsyPercent
    }
   }
  })
  return {
   crimeCount,
   crimePercent,
   crimeFalsyPercent,
   crimeTrufyPercent,
  }
 }
 const setEnd = crime => {
  let count = 0
  list.forEach(item => {
   if (item.type === crime) {
    count = count + 1
   }
  })
  return count
 }
 const fullPercent = () => {
  let falsy = 0
  let falsyPercent = 0
  let trufyPercent = 0
  list.forEach(item => {
   if (item.service === "не раскрыто") {
    falsy = falsy + 1
    falsyPercent = Math.floor((falsy / list.length) * 100)
   } else {
    trufyPercent = 100 - falsyPercent
   }
  })
  return { falsyPercent, trufyPercent }
 }
 const fullAll = crime => {
  let count = 0
  let percent = 0
  list.forEach(item => {
   if (item.type === crime) {
    count = count + 1
    percent = Math.floor((count / list.length) * 100)
   }
  })
  return percent
 }
 const memoFullPercent = useMemo(() => fullPercent(), [list.length])
 const footerTitle = useMemo(() => {
  let arr = []
  timeofCrimes.forEach(time => {
   const percent = setCrimeFull(time.fromTime, time.toTime).crimePercent
   arr = [...arr, { time: `${time.fromTime}-${time.toTime}`, percent }]
  })
  arr = arr.sort((a, b) => b.percent - a.percent)
  return arr
 }, [list.length])
 return (
    <Paper elevation={5} className={classes.root}>
           <Typography variant="h6" align="center">
    Ежедневный анализ по видам преступлений и времени совершённых на улицах на{" "}
    {moment(props.store.toDate).locale("ru").format("LL")}
   </Typography>
  <TableContainer className={`${classes.table} not-before`}>
   <Table padding={isPrint ? "checkbox" : "default"}>
    <MyTableHead />
    <TableBody>
     {timeofCrimes.map((time, index) => (
      <TableRow key={index} hover={true}>
       <TableCell
        variant="head"
        align="center"
       >{`${time.fromTime}-${time.toTime}`}</TableCell>
       {crimesList.map(crime => (
        <TableCell align="center" key={crime}>
         {setCrime(time.fromTime, time.toTime, crime)}
        </TableCell>
       ))}
       <TableCell align="center">
        {setCrimeFull(time.fromTime, time.toTime).crimeCount}
       </TableCell>
       <TableCell align="center">
        {setCrimeFull(time.fromTime, time.toTime).crimePercent}
       </TableCell>
       <TableCell align="center">
        {setCrimeFull(time.fromTime, time.toTime).crimeTrufyPercent}
       </TableCell>
       <TableCell align="center">
        {setCrimeFull(time.fromTime, time.toTime).crimeFalsyPercent}
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
    <TableFooter>
     <TableRow>
      <TableCell variant="head" align="center">
       Общий итог
      </TableCell>
      {crimesList.map(crime => (
       <TableCell key={crime} align="center">
        {setEnd(crime)}
       </TableCell>
      ))}
      <TableCell align="center">
       {list.length !== 0 ? list.length : 0}
      </TableCell>
      <TableCell align="center">{list.length !== 0 ? 100 : 0}</TableCell>
      <TableCell align="center">{memoFullPercent.trufyPercent}</TableCell>
      <TableCell align="center">{memoFullPercent.falsyPercent}</TableCell>
     </TableRow>
     <TableRow>
      <TableCell variant="head" align="center">
       в %
      </TableCell>
      {crimesList.map(crime => (
       <TableCell key={crime} align="center">
        {fullAll(crime)}
       </TableCell>
      ))}
      <TableCell align="center">{list.length !== 0 ? 100 : 0}</TableCell>
      <TableCell align="center">{list.length !== 0 ? 100 : 0}</TableCell>
      <TableCell align="center">{memoFullPercent.trufyPercent}</TableCell>
      <TableCell align="center">{memoFullPercent.falsyPercent}</TableCell>
     </TableRow>
    </TableFooter>
   </Table>
  </TableContainer>
  <Typography variant="h6" align="center">
        Вывод: Ежедневный анализ по видам преступлений и времени показывает{" "}
        {list.length !== 0 ? footerTitle[0].percent : "__"} % совершено с{" "}
        {list.length !== 0 ? footerTitle[0].time : "__"} часов
       </Typography>
  </Paper>
 )
})
