import React, { memo, useMemo, Fragment, useState, useEffect } from "react"
import {
 Table,
 TableCell,
 TableRow,
 TableHead,
 TableBody,
 TableFooter,
 TableContainer,
 TablePagination,
 Paper,
 Typography,
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import withStore from "./../../utils/withStore.js"
import moment from "moment"
import {
 tableOneHead,
 countCrime,
 mostCriminal,
} from "./../../data"
const useStyles = makeStyles({
 root: {
  width: "calc(100vw - 360px)",
  float: "right",
  marginRight: 10,
  marginTop: 10,
 },
 table: {
  marginTop: 20,
  marginBottom: 20
 },
 pagination: {
   width: 500,
   float: "right"
 }
})
const TableHeader = withStyles({
  head: {
    background: "#3749AA",
    color: "white"
  }
})(TableCell)
const Tr = memo(
 props => {
  const { crime, index } = props
  return (
   <TableRow hover={true}>
    <TableCell align="center">{index + 1}</TableCell>
    <TableCell align="center">{crime.type}</TableCell>
    <TableCell align="center">{crime.compDate}</TableCell>
    <TableCell align="center">{crime.kui}</TableCell>
    <TableCell align="center">
     {crime.address}
     <br />
     {crime.addressNote}
    </TableCell>
    <TableCell align="center">{crime.service}</TableCell>
    <TableCell align="center">{crime.object}</TableCell>
    <TableCell align="center">{crime.compTime}</TableCell>
    <TableCell align="center">{crime.compDayOfWeek}</TableCell>
    <TableCell align="center">
     {crime.patrolWay !== null ? crime.patrolWay : "-"}
    </TableCell>
   </TableRow>
  )
 },
 (prevProps, nextProps) =>
  prevProps.crime.id === nextProps.crime.id ? true : false
)
export default withStore(props => {
 const { crimes, updatedCrimes } = props.store.CrimeStore
const {city, patrols} = props.store.SistemDataStore.sistemData
 const classes = useStyles()

 const [page, setPage] = useState({})
 useEffect(() => {
  const patrolPage = () => {
    let obj = {}
    patrols.forEach(patrol => {
      obj = {...obj, [patrol]: 0}
    })
    return obj
   }
  setPage(patrolPage())
 }, [patrols.length])
 let checkMemo = props.store.toDate.get("date")
 const textDate = useMemo(() => props.store.toDate.format("DD.MM.YYYY"), [
  checkMemo,
 ])
 const crimeWord = (n, text_forms) => {
  n = Math.abs(n) % 100
  let n1 = n % 10
  if (n > 10 && n < 20) return text_forms[2]
  if (n1 > 1 && n1 < 5) return text_forms[1]
  if (n1 == 1) return text_forms[0]
  return text_forms[2]
 }
 const memoizeWord = useMemo(
  () =>
   crimeWord(crimes.length, ["преступление", "преступления", "преступлений"]),
  [crimes.length]
 )
 const mostCriminalMemo = useMemo(() => mostCriminal(crimes, patrols), [crimes.length])
 const headData = useMemo(
  () =>
   tableOneHead.map(item => (
    <TableHeader size="small" key={item} variant="head" align="center">
     {item}
    </TableHeader>
   )),
  [tableOneHead.length]
 )
 const countOnPage = patrol => {
  let count = 0
  if(updatedCrimes.length == 0) return count
  updatedCrimes.forEach(crime => {
    if(crime.AddressId.patrol === patrol) count = count + 1
  });
  return count
}
const patrolArrCrimes = patrol => {
  let arr = []
  updatedCrimes.forEach(crime => {
    if (crime.AddressId.patrol === patrol) arr = [...arr, crime]
   })
   return arr
}
 return (
   <Paper elevation={5} className={classes.root}>
  <TableContainer className={classes.table}>
   <Typography align="center" variant="h6">
    Ежедневный анализ криминогенной обстановки по преступлениям совершённых на
    улицах на {moment(props.store.toDate).locale("ru").format("LL")}
   </Typography>
   <Table stickyHeader={true}>
    <TableHead>
     <TableRow>{headData}</TableRow>
    </TableHead>
    <TableBody>
     {patrols.map(patrol => (
      <Fragment key={patrol}>
       <TableRow>
        <TableCell size="small" align="center" colSpan={10}>
         <Typography variant="overline">{patrol} отдел полиции</Typography>
        </TableCell>
       </TableRow>
       {updatedCrimes.length !== 0 ? (
            patrolArrCrimes(patrol)
            .map((crime, index) => (<Tr key={crime.id} crime={crime} index={index} />))
            .slice(page[patrol] * 5, page[patrol] * 5 + 5)
       ) : null}
       <TableRow>
         <TableCell colSpan={10}>
          <TablePagination 
                  rowsPerPageOptions={[]}
                  rowsPerPage={5}
                  component="div"
                  className={classes.pagination}
                  count={countOnPage(patrol)}
                  page={page[patrol]}
                  onChangePage={(_, newPage) => {
                    console.log(newPage)
                    setPage({...page, [patrol]: +newPage})}}/>
         </TableCell>
       </TableRow>
      </Fragment>
     ))}
    </TableBody>
    <TableFooter>
     <TableRow>
      <TableCell size="small" colSpan={10} align="right">
       <Typography>
        За <u>{textDate}</u> совершено <u>{crimes.length}</u> {memoizeWord} на
        улицах г. {city}, <br />
        {patrols.map(patrol => (
         <Fragment key={patrol}>
          {patrol} отдел полиции - <u>{countCrime(patrol, crimes).count}</u> из
          них раскрыто - <u>{countCrime(patrol, crimes).trufy}</u> нераскрыто -{" "}
          <u>{countCrime(patrol, crimes).falsy}</u> <br />
         </Fragment>
        ))}
        Вывод: Криминогенным районом является{" "}
        <u>{crimes.length !== 0 ? mostCriminalMemo[0].name : "___________"}</u>
       </Typography>
      </TableCell>
     </TableRow>
    </TableFooter>
   </Table>
  </TableContainer>
  </Paper>
 )
})
