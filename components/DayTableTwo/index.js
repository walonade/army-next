import React, { Fragment, useMemo } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  TableContainer,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyTableHead from "./../TableHead";
import withStore from "./../../utils/withStore.js";
import moment from "moment";
import { setTitleDate, kindOfCrimeData, timeofCrimes } from "./../../data";
const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginBottom: 20
  }
});
export default withStore(props => {
  const classes = useStyles();
  let list = props.store.CrimeStore.updatedCrimes;
  const titleDate = useMemo(() => setTitleDate(props.store.toDate), [
    props.store.toDate.get("date")
  ]);
  const setCrime = (fromTime, toTime, crimeIndex) => {
    let crimeCount = 0;
    const fromTF = moment(fromTime, "HH:mm");
    const toTF = moment(toTime, "HH:mm");
    list.forEach(item => {
      const itTF = moment(item.compTime, "HH:mm");
      if (item.type === kindOfCrimeData[crimeIndex]) {
        if (fromTF <= itTF && itTF < toTF) crimeCount = crimeCount + 1;
      }
    });
    return crimeCount;
  };
  const setCrimeFull = (fromTime, toTime) => {
    let crimeCount = 0;
    let crimePercent = 0;
    let crimeFalsy = 0;
    let crimeFalsyPercent = 0;
    let crimeTrufyPercent = 0;
    const fromTF = moment(fromTime, "HH:mm");
    const toTF = moment(toTime, "HH:mm");
    list.forEach(item => {
      const itTF = moment(item.compTime, "HH:mm");
      if (fromTF <= itTF && itTF < toTF) {
        crimeCount = crimeCount + 1;
        crimePercent = Math.floor((crimeCount / list.length) * 100);
        if (item.service === "не раскрыто") {
          crimeFalsy = crimeFalsy + 1;
          crimeFalsyPercent = Math.floor((crimeFalsy / crimeCount) * 100);
          crimeTrufyPercent = 100 - crimeFalsyPercent;
        }
      }
    });
    return {
      crimeCount,
      crimePercent,
      crimeFalsyPercent,
      crimeTrufyPercent
    };
  };
  const setEnd = crimeIndex => {
    let count = 0;
    list.forEach(item => {
      if (item.type === kindOfCrimeData[crimeIndex]) {
        count = count + 1;
      }
    });
    return count;
  };
  const fullPercent = () => {
    let falsy = 0;
    let falsyPercent = 0;
    let trufyPercent = 0;
    list.forEach(item => {
      if (item.service === "не раскрыто") {
        falsy = falsy + 1;
        falsyPercent = Math.floor((falsy / list.length) * 100);
        trufyPercent = 100 - falsyPercent;
      }
    });
    return { falsyPercent, trufyPercent };
  };
  const fullAll = crimeIndex => {
    let count = 0;
    let percent = 0;
    list.forEach(item => {
      if (item.type === kindOfCrimeData[crimeIndex]) {
        count = count + 1;
        percent = Math.floor((count / list.length) * 100);
      }
    });
    return percent;
  };
  const memoFullPercent = useMemo(() => fullPercent(), [list.length]);
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={17} align="center">
              <Typography variant="h6">
                Ежедневный анализ по видам преступлений и времени совершённых на
                улицах на «<u> {titleDate.day} </u>»&nbsp;
                <u>{titleDate.month}</u>
                &nbsp;
                {titleDate.year}г.
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <MyTableHead />
        <TableBody>
          {timeofCrimes.map((time, index) => (
            <TableRow key={index} hover={true}>
              <TableCell
                variant="head"
                align="center"
              >{`${time.fromTime}-${time.toTime}`}</TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 0)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 1)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 2)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 3)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 4)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 5)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 6)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 7)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 8)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 9)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 10)}
              </TableCell>
              <TableCell align="center">
                {setCrime(time.fromTime, time.toTime, 11)}
              </TableCell>
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
            <TableCell align="center">{setEnd(0)}</TableCell>
            <TableCell align="center">{setEnd(1)}</TableCell>
            <TableCell align="center">{setEnd(2)}</TableCell>
            <TableCell align="center">{setEnd(3)}</TableCell>
            <TableCell align="center">{setEnd(4)}</TableCell>
            <TableCell align="center">{setEnd(5)}</TableCell>
            <TableCell align="center">{setEnd(6)}</TableCell>
            <TableCell align="center">{setEnd(7)}</TableCell>
            <TableCell align="center">{setEnd(8)}</TableCell>
            <TableCell align="center">{setEnd(9)}</TableCell>
            <TableCell align="center">{setEnd(10)}</TableCell>
            <TableCell align="center">{setEnd(11)}</TableCell>
            <TableCell align="center">
              {list.length !== 0 ? list.length : 0}
            </TableCell>
            <TableCell align="center">{list.length !== 0 ? 100 : 0}</TableCell>
            <TableCell align="center">{memoFullPercent.trufyPercent}</TableCell>
            <TableCell align="center">{memoFullPercent.trufyPercent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" align="center">
              в %
            </TableCell>
            <TableCell align="center">{fullAll(0)}</TableCell>
            <TableCell align="center">{fullAll(1)}</TableCell>
            <TableCell align="center">{fullAll(2)}</TableCell>
            <TableCell align="center">{fullAll(3)}</TableCell>
            <TableCell align="center">{fullAll(4)}</TableCell>
            <TableCell align="center">{fullAll(5)}</TableCell>
            <TableCell align="center">{fullAll(6)}</TableCell>
            <TableCell align="center">{fullAll(7)}</TableCell>
            <TableCell align="center">{fullAll(8)}</TableCell>
            <TableCell align="center">{fullAll(9)}</TableCell>
            <TableCell align="center">{fullAll(10)}</TableCell>
            <TableCell align="center">{fullAll(11)}</TableCell>
            <TableCell align="center">{list.length !== 0 ? 100 : 0}</TableCell>
            <TableCell align="center">{list.length !== 0 ? 100 : 0}</TableCell>
            <TableCell align="center">{memoFullPercent.trufyPercent}</TableCell>
            <TableCell align="center">{memoFullPercent.trufyPercent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={17} align="center">
              <Typography variant="h6">
                Вывод: Ежедневный анализ по видам преступлений и времени
                показывает __ % совершено с __ часов
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
});
