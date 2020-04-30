import React, { Fragment, useMemo } from "react";
import moment from "moment";
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
import { kindOfCrimeData, patrols, city } from "./../../data";
import withStore from "./../../utils/withStore.js";
const useStyles = makeStyles({
  root: {
    marginTop: 20,
    marginBottom: 20
  }
});
export default withStore(props => {
  const classes = useStyles();
  const list = props.store.CrimeStore.updatedCrimes;
  const year = useMemo(() => {
    const fromDate = props.store.fromDate.format("DD.MM.YYYY");
    const toDate = props.store.toDate.format("DD.MM.YYYY");
    const year = props.store.toDate.get("year");
    return {
      currentYear: year,
      lastYear: year - 1,
      fromDate,
      toDate
    };
  }, [props.store.toDate.get("year")]);
  const crimeType = (crime, year, patrol) => {
    let count = 0;
    list.forEach(item => {
      if (item.type === crime) {
        if (moment(item.date).get("year") === year) {
          if (item.AddressId.patrol === patrol) count = count + 1;
        }
      }
    });
    return count;
  };
  const crimeTypeAll = crime => {
    let count = 0;
    list.forEach(item => {
      if (item.type === crime) count = count + 1;
    });
    return count;
  };
  const crimeForYearAndPatrol = (patrol, year) => {
    let count = 0;
    list.forEach(item => {
      if (item.AddressId.patrol === patrol) {
        if (moment(item.date).get("year") === year) count = count + 1;
      }
    });
    return count;
  };
  const crimesForYear = year => {
    let count = 0;
    list.forEach(item => {
      if (moment(item.date).get("year") === year) count = count + 1;
    });
    return count;
  };
  const percentPatrol = patrol => {
    let countLast = 0;
    let countCurrent = 0;
    let percent = 0;
    list.forEach(item => {
      if (item.AddressId.patrol === patrol) {
        moment(item.date).get("year") === year.currentYear
          ? (countCurrent = countCurrent + 1)
          : (countLast = countLast + 1);
        percent =
          countLast !== 0 ? (countCurrent * 100) / countLast - 100 : 100;
      }
    });
    return percent;
  };
  const allPercent = useMemo(() => {
    let countLast = 0;
    let countCurrent = 0;
    let percent = 0;
    list.forEach(item => {
      moment(item.date).get("year") === year.currentYear
        ? (countCurrent = countCurrent + 1)
        : (countLast = countLast + 1);
      percent = countLast !== 0 ? (countCurrent * 100) / countLast - 100 : 100;
    });
    return percent;
  }, [list.length]);
  const mostCriminal = () => {
    let arr = [
      {
        name: patrols[0],
        count: 0
      },
      {
        name: patrols[1],
        count: 0
      },
      {
        name: patrols[2],
        count: 0
      }
    ];
    list.forEach(item => {
      const count = 0;
      switch (item.AddressId.patrol) {
        case patrols[0]:
          arr[0].count = arr[0].count + 1;
          break;
        case patrols[1]:
          arr[1].count = arr[1].count + 1;
          break;
        case patrols[2]:
          arr[2].count = arr[2].count + 1;
          break;
      }
    });
    return arr;
  };
  const sortArrPatrol = useMemo(
    () => mostCriminal().sort((a, b) => b.count - a.count),
    [list.length]
  );
  return (
    <Fragment>
      <div className="own-list">
        <Typography variant="h5" align="center">
          Анализ
        </Typography>
        <Typography variant="h6" align="center">
          совершённых преступлений по оперативной сводке на территории г. {city}
          {" "}<u>{year.fromDate}</u> года по <u>{year.toDate}</u> года
          <br />
          зарегистрировано на улицах <u>{crimesForYear(year.currentYear)}</u>, в{" "}
          {year.lastYear} году зарегистрировано на улицах{" "}
          <u>{crimesForYear(year.lastYear)}</u> преступлений.
          <br />
          <br />
          Состояние уличной преступности
          <br />
          (по районам несения службы)
        </Typography>
      </div>
      <TableContainer component={Paper} className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Виды преступления
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {patrols[0]} ОП
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {patrols[1]} ОП
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {patrols[2]} ОП
              </TableCell>
              <TableCell align="center" rowSpan={2}>
                Всего
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{year.lastYear}</TableCell>
              <TableCell align="center">{year.currentYear}</TableCell>
              <TableCell align="center">{year.lastYear}</TableCell>
              <TableCell align="center">{year.currentYear}</TableCell>
              <TableCell align="center">{year.lastYear}</TableCell>
              <TableCell align="center">{year.currentYear}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kindOfCrimeData.map(item => (
              <TableRow key={item}>
                <TableCell variant="head" align="center">
                  {item}
                </TableCell>
                <TableCell align="center">
                  {crimeType(item, year.lastYear, patrols[0])}
                </TableCell>
                <TableCell align="center">
                  {crimeType(item, year.currentYear, patrols[0])}
                </TableCell>
                <TableCell align="center">
                  {crimeType(item, year.lastYear, patrols[1])}
                </TableCell>
                <TableCell align="center">
                  {crimeType(item, year.currentYear, patrols[1])}
                </TableCell>
                <TableCell align="center">
                  {crimeType(item, year.lastYear, patrols[2])}
                </TableCell>
                <TableCell align="center">
                  {crimeType(item, year.currentYear, patrols[2])}
                </TableCell>
                <TableCell align="center">{crimeTypeAll(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Район патрулирования
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Совершено преступлений на улицах
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{year.lastYear} год</TableCell>
              <TableCell align="center">{year.currentYear} год</TableCell>
              <TableCell align="center">%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell variant="head" align="center">
                {patrols[0]} ОП
              </TableCell>
              <TableCell align="center">
                {crimeForYearAndPatrol(patrols[0], year.lastYear)}
              </TableCell>
              <TableCell align="center">
                {crimeForYearAndPatrol(patrols[0], year.currentYear)}
              </TableCell>
              <TableCell align="center">{percentPatrol(patrols[0])}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="center">
                {patrols[1]} ОП
              </TableCell>
              <TableCell align="center">
                {crimeForYearAndPatrol(patrols[1], year.lastYear)}
              </TableCell>
              <TableCell align="center">
                {crimeForYearAndPatrol(patrols[1], year.currentYear)}
              </TableCell>
              <TableCell align="center">{percentPatrol(patrols[1])}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="center">
                {patrols[2]} ОП
              </TableCell>
              <TableCell align="center">
                {crimeForYearAndPatrol(patrols[2], year.lastYear)}
              </TableCell>
              <TableCell align="center">
                {crimeForYearAndPatrol(patrols[2], year.currentYear)}
              </TableCell>
              <TableCell align="center">{percentPatrol(patrols[2])}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" align="center">
                Всего
              </TableCell>
              <TableCell align="center">
                {crimesForYear(year.lastYear)}
              </TableCell>
              <TableCell align="center">
                {crimesForYear(year.currentYear)}
              </TableCell>
              <TableCell align="center">{allPercent}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell variant="head" align="center" colSpan={4}>
                <Typography variant="overline">
                  По территориальности креминогенными районами являются:
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <u>{sortArrPatrol[0].name}</u> ОП
              </TableCell>
              <TableCell align="center" colSpan={2}>
                где допущено <u>{sortArrPatrol[0].count}</u> преступлений на
                улицах
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <u>{sortArrPatrol[1].name}</u> ОП
              </TableCell>
              <TableCell align="center" colSpan={2}>
                где допущено <u>{sortArrPatrol[1].count}</u> преступлений на
                улицах
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <u>{sortArrPatrol[2].name}</u> ОП
              </TableCell>
              <TableCell align="center" colSpan={2}>
                где допущено <u>{sortArrPatrol[2].count}</u> преступлений на
                улицах
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
  );
});
