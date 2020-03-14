import React, { Fragment, memo, useMemo } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
  TableContainer,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withStore from "./../../utils/withStore.js";
import moment from "moment";
import { setTitleDate, tableOneHead, patrols } from "./../../data";
const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginBottom: 20
  }
})
const Tr = memo(
  props => {
    const { item, index } = props;
    return (
      <TableRow hover={true}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{item.type}</TableCell>
        <TableCell align="center">{item.compDate}</TableCell>
        <TableCell align="center">{item.kui}</TableCell>
        <TableCell align="center">{item.address}</TableCell>
        <TableCell align="center">{item.service}</TableCell>
        <TableCell align="center">{item.object}</TableCell>
        <TableCell align="center">{item.compTime}</TableCell>
        <TableCell align="center">{item.compDayOfWeek}</TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id ? true : false
);
const EmptyTr = () => {
  const arr = [...Array(10)];
  return (
    <TableRow hover={true}>
      {arr.map((item, index) => (
        <TableCell key={index} align="center">
          -
        </TableCell>
      ))}
    </TableRow>
  );
};
export default withStore(props => {
  const classes = useStyles()
  const {
    tableOneNorth,
    tableOneCenter,
    tableOneSouth
  } = props.store.CrimesTableStore;
  let checkMemo = props.store.toDate.get("date");
  const { updatedCrimes } = props.store.CrimeStore;
  const titleDate = useMemo(() => setTitleDate(props.store.toDate), [
    checkMemo
  ]);
  const textDate = useMemo(() => props.store.toDate.format("DD.MM.YYYY"), [
    checkMemo
  ]);
  const countCrime = arr => {
    let data = { count: arr.length, trufy: 0, falsy: 0 };
    arr.map(item => {
      item.service === "не раскрыто"
        ? (data = { ...data, falsy: data.falsy + 1 })
        : (data = { ...data, trufy: data.trufy + 1 });
    });
    return data;
  };
  const crimeWord = (n, text_forms) => {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) return text_forms[2];
    if (n1 > 1 && n1 < 5) return text_forms[1];
    if (n1 == 1) return text_forms[0];
    return text_forms[2];
  };
  const memoizeWord = useMemo(
    () =>
      crimeWord(updatedCrimes.length, [
        "преступление",
        "преступления",
        "преступлений"
      ]),
    [updatedCrimes.length]
  );
  const countNorth = useMemo(() => countCrime(tableOneNorth), [
    tableOneNorth.length
  ]);
  const countCenter = useMemo(() => countCrime(tableOneCenter), [
    tableOneCenter.length
  ]);
  const countSouth = useMemo(() => countCrime(tableOneSouth), [
    tableOneSouth.length
  ]);
  const mostCriminal = useMemo(() => {
    const sortArr = [
      { name: patrols[0], length: tableOneNorth.length },
      { name: patrols[1], length: tableOneCenter.length },
      { name: patrols[2], length: tableOneSouth.length }
    ];
    sortArr.sort((a, b) => b.length - a.length);
    return updatedCrimes.length === 0 ? "___________" : sortArr[0].name;
  }, [updatedCrimes.length]);
  const headData = useMemo(
    () =>
      tableOneHead.map(item => (
        <TableCell key={item} variant="head" align="center">
          {item}
        </TableCell>
      )),
    [tableOneHead.length]
  );
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={10} align="center">
              <Typography variant="h6">
                Ежедневный анализ криминогенной обстановки по преступлениям
                совершённых на улицах на «<u> {titleDate.day} </u>»{" "}
                <u>{titleDate.month}</u> {titleDate.year}г.
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>{headData}</TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={10}>
              <Typography variant="overline">Северный отдел полиции</Typography>
            </TableCell>
          </TableRow>
          {tableOneNorth.length !== 0 ? (
            tableOneNorth.map((item, index) => (
              <Tr key={item.id} item={item} index={index} />
            ))
          ) : (
            <EmptyTr />
          )}
          <TableRow>
            <TableCell align="center" colSpan={10}>
              <Typography variant="overline">
                Центральный отдел полиции
              </Typography>
            </TableCell>
          </TableRow>
          {tableOneCenter.length !== 0 ? (
            tableOneCenter.map((item, index) => (
              <Tr key={item.id} item={item} index={index} />
            ))
          ) : (
            <EmptyTr />
          )}
          <TableRow>
            <TableCell align="center" colSpan={10}>
              <Typography variant="overline">Южный отдел полиции</Typography>
            </TableCell>
          </TableRow>
          {tableOneSouth.length !== 0 ? (
            tableOneSouth.map((item, index) => (
              <Tr key={item.id} item={item} index={index} />
            ))
          ) : (
            <EmptyTr />
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10} align="right">
              <Typography>
                За <u>{textDate}</u> совершено <u>{updatedCrimes.length}</u>{" "}
                {memoizeWord} на улицах г. Павлодар, <br />
                По северному отделу полиции - <u>{countNorth.count}</u> из них
                раскрыто - <u>{countNorth.trufy}</u> нераскрыто -{" "}
                <u>{countNorth.falsy}</u> <br />
                По центральному отделу полиции - <u>{countCenter.count}</u> из
                них раскрыто - <u>{countCenter.trufy}</u> нераскрыто -{" "}
                <u>{countCenter.falsy}</u>
                <br />
                По южному отделу полиции - <u>{countSouth.count}</u> из них
                раскрыто - <u>{countSouth.trufy}</u> нераскрыто -{" "}
                <u>{countSouth.falsy}</u>
                <br />
                Вывод: Криминогенным районом является <u>{mostCriminal}</u>
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
});
