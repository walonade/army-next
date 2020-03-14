import React, { Fragment, useMemo } from "react";
import withStore from "./../../utils/withStore.js";
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
import MyTableHead from "./../TableHead";
import { weekDays, kindOfCrimeData, days } from "./../../data";
export default withStore(props => {
  const list = props.store.CrimeStore.updatedCrimes;
  const textDate = useMemo(() => {
    const { fromDate, toDate } = props.store;
    return {
      fromDate: fromDate.format("DD.MM"),
      toDate: toDate.format("DD.MM"),
      year: toDate.format("YYYY")
    };
  }, [props.store.fromDate.get("date"), props.store.toDate.get("date")]);
  const setCrime = (weekDay, crimeIndex) => {
    let crimeCount = 0;
    let fullCrimeCount = 0;
    list.forEach(item => {
      if (item.type === kindOfCrimeData[crimeIndex]) {
        if (item.compDayOfWeek === weekDay) crimeCount = crimeCount + 1;
      }
    });
    return crimeCount;
  };
  const crimeType = crimeIndex => {
    let crimeCount = 0;
    list.forEach(item => {
      if (item.type === kindOfCrimeData[crimeIndex])
        crimeCount = crimeCount + 1;
    });
    return crimeCount;
  };
  const crimeWeek = day => {
    let crimeCount = 0;
    list.forEach(item => {
      if (item.compDayOfWeek === day) crimeCount = crimeCount + 1;
    });
    return crimeCount;
  };
  const crimeWeekPercent = day => {
    let count = 0;
    let percent = 0;
    let falsy = 0;
    let falsyPercent = 0;
    let trufyPercent = 0;
    list.forEach(item => {
      if (item.compDayOfWeek === day) {
        count = count + 1;
        percent = Math.floor((count / list.length) * 100);
        if (item.service === "не раскрыто") {
          falsy = falsy + 1;
          falsyPercent = Math.floor((falsy / list.length) * 100);
          trufyPercent = 100 - falsyPercent;
        }
      }
    });
    return {
      percent,
      falsyPercent,
      trufyPercent
    };
  };
  const fullPercent = useMemo(() => {
    let count = 0;
    let falsyPercent = 0;
    let trufyPercent = 0;
    list.forEach(item => {
      if (item.service === "не раскрыто") {
        count = count + 1;
        falsyPercent = Math.floor((count / list.length) * 100);
        trufyPercent = 100 - falsyPercent;
      }
    });
    return {
      falsyPercent,
      trufyPercent
    };
  }, [list.length]);
  const percent = useMemo(() => {
    return list.length !== 0 ? 100 : 0;
  }, [list.length]);
  const percentType = crimeIndex => {
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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={17} align="center">
              <Typography variant="h6">
                Еженедельный анализ по видам преступлений и дням недели
                совершённые на улицах с <u>{textDate.fromDate}</u> по{" "}
                <u>{textDate.toDate}</u> {textDate.year}г.
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <MyTableHead week={true} />
        <TableBody>
          {days.map(item => (
            <TableRow key={item} hover={true}>
              <TableCell align="center" variant="head">
                {item}
              </TableCell>
              <TableCell align="center">{setCrime(item, 0)}</TableCell>
              <TableCell align="center">{setCrime(item, 1)}</TableCell>
              <TableCell align="center">{setCrime(item, 2)}</TableCell>
              <TableCell align="center">{setCrime(item, 3)}</TableCell>
              <TableCell align="center">{setCrime(item, 4)}</TableCell>
              <TableCell align="center">{setCrime(item, 5)}</TableCell>
              <TableCell align="center">{setCrime(item, 6)}</TableCell>
              <TableCell align="center">{setCrime(item, 7)}</TableCell>
              <TableCell align="center">{setCrime(item, 8)}</TableCell>
              <TableCell align="center">{setCrime(item, 9)}</TableCell>
              <TableCell align="center">{setCrime(item, 10)}</TableCell>
              <TableCell align="center">{setCrime(item, 11)}</TableCell>
              <TableCell align="center">{crimeWeek(item)}</TableCell>
              <TableCell align="center">
                {crimeWeekPercent(item).percent}
              </TableCell>
              <TableCell align="center">
                {crimeWeekPercent(item).trufyPercent}
              </TableCell>
              <TableCell align="center">
                {crimeWeekPercent(item).falsyPercent}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="center" variant="head">
              Общий итог
            </TableCell>
            <TableCell align="center">{crimeType(0)}</TableCell>
            <TableCell align="center">{crimeType(1)}</TableCell>
            <TableCell align="center">{crimeType(2)}</TableCell>
            <TableCell align="center">{crimeType(3)}</TableCell>
            <TableCell align="center">{crimeType(4)}</TableCell>
            <TableCell align="center">{crimeType(5)}</TableCell>
            <TableCell align="center">{crimeType(6)}</TableCell>
            <TableCell align="center">{crimeType(7)}</TableCell>
            <TableCell align="center">{crimeType(8)}</TableCell>
            <TableCell align="center">{crimeType(9)}</TableCell>
            <TableCell align="center">{crimeType(10)}</TableCell>
            <TableCell align="center">{crimeType(11)}</TableCell>
            <TableCell align="center">
              {list.length != 0 ? list.length : 0}
            </TableCell>
            <TableCell align="center">{percent}</TableCell>
            <TableCell align="center">{fullPercent.trufyPercent}</TableCell>
            <TableCell align="center">{fullPercent.falsyPercent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" variant="head">
              В %
            </TableCell>
            <TableCell align="center">{percentType(0)}</TableCell>
            <TableCell align="center">{percentType(1)}</TableCell>
            <TableCell align="center">{percentType(2)}</TableCell>
            <TableCell align="center">{percentType(3)}</TableCell>
            <TableCell align="center">{percentType(4)}</TableCell>
            <TableCell align="center">{percentType(5)}</TableCell>
            <TableCell align="center">{percentType(6)}</TableCell>
            <TableCell align="center">{percentType(7)}</TableCell>
            <TableCell align="center">{percentType(8)}</TableCell>
            <TableCell align="center">{percentType(9)}</TableCell>
            <TableCell align="center">{percentType(10)}</TableCell>
            <TableCell align="center">{percentType(11)}</TableCell>
            <TableCell rowSpan={4}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
});
