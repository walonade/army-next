import React, { Fragment, useMemo } from "react";
import TableDiv from "./../TableDiv";
import moment from "moment";
import { kindOfCrimeData, patrols } from "./../../data";
import withStore from "./../../utils/withStore.js";
export default withStore(props => {
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
          if (item.patrol === patrol) count = count + 1;
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
      if (item.patrol === patrol) {
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
      if (item.patrol === patrol) {
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
      switch (item.patrol) {
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
  const sortArrPatrol = mostCriminal().sort((a, b) => b.count - a.count);
  return (
    <Fragment>
      <TableDiv>
        <h2>Анализ</h2>
        <h3>
          совершённых преступлений по оперативной сводке на территории г.
          Павлодар с <u>{year.fromDate}</u> года по <u>{year.toDate}</u> года
          <br />
          зарегистрировано на улицах __, в {year.currentYear} году
          зарегистрировано на улицах __ преступлений.
          <br />
          <br />
          Состояние уличной преступности
          <br />
          (по районам несения службы)
        </h3>
        <table>
          <thead>
            <tr>
              <td rowSpan={2}>Виды преступления</td>
              <th colSpan={2}>{patrols[0]} ОП</th>
              <th colSpan={2}>{patrols[1]} ОП</th>
              <th colSpan={2}>{patrols[2]} ОП</th>
              <th>Всего</th>
            </tr>
            <tr>
              <td>{year.lastYear}</td>
              <td>{year.currentYear}</td>
              <td>{year.lastYear}</td>
              <td>{year.currentYear}</td>
              <td>{year.lastYear}</td>
              <td>{year.currentYear}</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {kindOfCrimeData.map(item => (
              <tr key={item}>
                <td>{item}</td>
                <td>{crimeType(item, year.lastYear, patrols[0])}</td>
                <td>{crimeType(item, year.currentYear, patrols[0])}</td>
                <td>{crimeType(item, year.lastYear, patrols[1])}</td>
                <td>{crimeType(item, year.currentYear, patrols[1])}</td>
                <td>{crimeType(item, year.lastYear, patrols[2])}</td>
                <td>{crimeType(item, year.currentYear, patrols[2])}</td>
                <td>{crimeTypeAll(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <table>
          <thead>
            <tr>
              <td rowSpan={2}>
                Район
                <br />
                патрулирования
              </td>
              <th colSpan={3}>Совершено преступлений на улицах</th>
            </tr>
            <tr>
              <th>{year.lastYear} год</th>
              <th>{year.currentYear} год</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{patrols[0]} ОП</td>
              <td>{crimeForYearAndPatrol(patrols[0], year.lastYear)}</td>
              <td>{crimeForYearAndPatrol(patrols[0], year.currentYear)}</td>
              <td>{percentPatrol(patrols[0])}</td>
            </tr>
            <tr>
              <td>{patrols[1]} ОП</td>
              <td>{crimeForYearAndPatrol(patrols[1], year.lastYear)}</td>
              <td>{crimeForYearAndPatrol(patrols[1], year.currentYear)}</td>
              <td>{percentPatrol(patrols[1])}</td>
            </tr>
            <tr>
              <td>{patrols[2]} ОП</td>
              <td>{crimeForYearAndPatrol(patrols[2], year.lastYear)}</td>
              <td>{crimeForYearAndPatrol(patrols[2], year.currentYear)}</td>
              <td>{percentPatrol(patrols[2])}</td>
            </tr>
            <tr>
              <th>Всего</th>
              <td>{crimesForYear(year.lastYear)}</td>
              <td>{crimesForYear(year.currentYear)}</td>
              <td>{allPercent}</td>
            </tr>
          </tbody>
        </table>
      </TableDiv>
      <h4>По территориальности креминогенными районами являются:</h4>
      <h5>
        <u>{sortArrPatrol[0].name}</u> ОП, где допущено{" "}
        <u>{sortArrPatrol[0].count}</u> преступлений на улицах
      </h5>
      <h5>
        <u>{sortArrPatrol[1].name}</u> ОП, где допущено{" "}
        <u>{sortArrPatrol[1].count}</u> преступлений на улицах
      </h5>
      <h5>
        <u>{sortArrPatrol[2].name}</u> ОП, где допущено{" "}
        <u>{sortArrPatrol[2].count}</u> преступлений на улицах
      </h5>
    </Fragment>
  );
});
