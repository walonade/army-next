import React, { useMemo } from "react"
import withStore from "./../../utils/withStore.js"
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
import MyTableHead from "./../TableHead"
import { days } from "./../../data"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles({
    root: {
     width: "calc(100vw - 350px)",
     float: "right",
     marginRight: 10,
     marginTop: 10
    },
    table: {
     marginTop: 20,
     marginBottom: 20
    }
   })
export default withStore(props => {
const classes = useStyles()
 const list = props.store.CrimeStore.updatedCrimes
 const {crimesList} = props.store.SistemDataStore.sistemData
 const { isPrint } = props.store
 const textDate = useMemo(() => {
  const { fromDate, toDate } = props.store
  return {
   fromDate: fromDate.format("DD.MM"),
   toDate: toDate.format("DD.MM"),
   year: toDate.format("YYYY"),
  }
 }, [props.store.fromDate.get("date"), props.store.toDate.get("date")])
 const setCrime = (weekDay, crime) => {
  let crimeCount = 0
  list.forEach(item => {
   if (item.type === crime) {
    if (item.compDayOfWeek === weekDay) crimeCount = crimeCount + 1
   }
  })
  return crimeCount
 }
 const crimeType = crime => {
  let crimeCount = 0
  list.forEach(item => {
   if (item.type === crime) crimeCount = crimeCount + 1
  })
  return crimeCount
 }
 const crimeWeek = day => {
  let crimeCount = 0
  list.forEach(item => {
   if (item.compDayOfWeek === day) crimeCount = crimeCount + 1
  })
  return crimeCount
 }
 const crimeWeekPercent = day => {
  let count = 0
  let percent = 0
  let falsy = 0
  let falsyPercent = 0
  let trufyPercent = 0
  list.forEach(item => {
   if (item.compDayOfWeek === day) {
    count = count + 1
    percent = Math.floor((count / list.length) * 100)
    if (item.service === "не раскрыто") {
     falsy = falsy + 1
     falsyPercent = Math.floor((falsy / list.length) * 100)
    } else {
     trufyPercent = 100 - falsyPercent
    }
   }
  })
  return {
   percent,
   falsyPercent,
   trufyPercent,
  }
 }
 const fullPercent = useMemo(() => {
  let count = 0
  let falsyPercent = 0
  let trufyPercent = 0
  list.forEach(item => {
   if (item.service === "не раскрыто") {
    count = count + 1
    falsyPercent = Math.floor((count / list.length) * 100)
    trufyPercent = 100 - falsyPercent
   }
  })
  return {
   falsyPercent,
   trufyPercent,
  }
 }, [list.length])
 const percent = useMemo(() => {
  return list.length !== 0 ? 100 : 0
 }, [list.length])
 const percentType = crime => {
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
 const footerTitle = useMemo(() => {
  let arrDay = []
  days.forEach(day => {
   const { percent } = crimeWeekPercent(day)
   arrDay = [...arrDay, { day, percent }]
  })
  arrDay = arrDay.sort((a, b) => b.percent - a.percent)
  let arrCrime = []
  kindOfCrimeData.forEach(crime => {
   const percent = percentType(crime)
   arrCrime = [...arrCrime, { crime, percent }]
  })
  arrCrime = arrCrime.sort((a, b) => b.percent - a.percent)
  return {
   day: arrDay[0].day.toLowerCase(),
   crime: arrCrime[0].crime.toLowerCase(),
   dayPercent: arrDay[0].percent,
   crimePercent: arrCrime[0].percent,
  }
 }, [list.length])
 return (
 <Paper elevation={5} className={classes.root}>
    <Typography variant="h6" align="center">
        Еженедельный анализ по видам преступлений и дням недели совершённые на
        улицах с <u>{textDate.fromDate}</u> по <u>{textDate.toDate}</u>{" "}
        {textDate.year}г.
    </Typography>
  <TableContainer>
   <Table padding={isPrint ? "checkbox" : "default"}>
    <MyTableHead week={true} />
    <TableBody>
     {days.map(day => (
      <TableRow key={day} hover={true}>
       <TableCell align="center" variant="head">
        {day}
       </TableCell>
       {crimesList.map(crime => (
        <TableCell key={crime} align="center">
         {setCrime(day, crime)}
        </TableCell>
       ))}
       <TableCell align="center">{crimeWeek(day)}</TableCell>
       <TableCell align="center">{crimeWeekPercent(day).percent}</TableCell>
       <TableCell align="center">
        {crimeWeekPercent(day).trufyPercent}
       </TableCell>
       <TableCell align="center">
        {crimeWeekPercent(day).falsyPercent}
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
    <TableFooter>
     <TableRow>
      <TableCell align="center" variant="head">
       Общий итог
      </TableCell>
      {kindOfCrimeData.map(crime => (
       <TableCell key={crime} align="center">
        {crimeType(crime)}
       </TableCell>
      ))}
      <TableCell align="center">{list.length != 0 ? list.length : 0}</TableCell>
      <TableCell align="center">{percent}</TableCell>
      <TableCell align="center">{fullPercent.trufyPercent}</TableCell>
      <TableCell align="center">{fullPercent.falsyPercent}</TableCell>
     </TableRow>
     <TableRow>
      <TableCell align="center" variant="head">
       В %
      </TableCell>
      {crimesList.map(crime => (
       <TableCell key={crime} align="center">
        {percentType(crime)}
       </TableCell>
      ))}
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
     </TableRow>
    </TableFooter>
   </Table>
  </TableContainer>
  <Typography variant="h6" align="center">
        Вывод: Еженедельный анализ по видам показвывает{" "}
        {list.length != 0 ? `${footerTitle.crimePercent}%` : "__"} преступлений{" "}
        {list.length != 0 ? footerTitle.crime : "__"},{" "}
        {list.length != 0 ? `${footerTitle.dayPercent}%` : "__"} совершено в{" "}
        {list.length != 0 ? footerTitle.day : "__"}.
       </Typography>
  </Paper>
 )
})
