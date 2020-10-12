import React, { memo, useMemo, Fragment } from "react"
import {
 Table,
 TableCell,
 TableRow,
 TableHead,
 TableBody,
 TableFooter,
 TableContainer,
 Paper,
 Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import withStore from "./../../utils/withStore.js"
import moment from "moment"
import {
 tableOneHead,
 patrols,
 city,
 countCrime,
 mostCriminal,
} from "./../../data"
const useStyles = makeStyles({
 root: {
  marginTop: 20,
  marginBottom: 20,
 },
})
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
 const classes = useStyles()
 let checkMemo = props.store.toDate.get("date")
 const { crimes, updatedCrimes } = props.store.CrimeStore
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
 const mostCriminalMemo = useMemo(() => mostCriminal(crimes), [crimes.length])
 const headData = useMemo(
  () =>
   tableOneHead.map(item => (
    <TableCell key={item} variant="head" align="center">
     {item}
    </TableCell>
   )),
  [tableOneHead.length]
 )
 return (
  <TableContainer component={Paper} className={classes.root}>
   <Typography align="center" variant="h6">
    Ежедневный анализ криминогенной обстановки по преступлениям совершённых на
    улицах на {moment(props.store.toDate).locale("ru").format("LL")}
   </Typography>
   <Table>
    <TableHead>
     <TableRow>{headData}</TableRow>
    </TableHead>
    <TableBody>
     {patrols.map(patrol => (
      <Fragment key={patrol}>
       <TableRow>
        <TableCell align="center" colSpan={10}>
         <Typography variant="overline">{patrol} отдел полиции</Typography>
        </TableCell>
       </TableRow>
       {updatedCrimes.length !== 0 ? (
        updatedCrimes.map((crime, index) => {
         if (crime.AddressId.patrol === patrol) {
          return <Tr key={crime.id} crime={crime} index={index} />
         }
        })
       ) : null}
      </Fragment>
     ))}
    </TableBody>
    <TableFooter>
     <TableRow>
      <TableCell colSpan={10} align="right">
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
 )
})
