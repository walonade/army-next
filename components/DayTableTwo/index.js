import React, { Fragment, useMemo } from "react";
import TableDiv from "./../TableDiv";
import TableHead from "./../TableHead";
import withStore from "./../../utils/withStore.js";
import moment from "moment";
import { setTitleDate, kindOfCrimeData, timeofCrimes } from "./../../data";
export default withStore(props => {
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
    <Fragment>
      <TableDiv>
        <h3>
          Ежедневный анализ
          <br /> по видам преступлений и времени совершённых на улицах на «
          <u> {titleDate.day} </u>»&nbsp;<u>{titleDate.month}</u>&nbsp;
          {titleDate.year}г.
        </h3>
        <table>
          <TableHead />
          <tbody>
            {timeofCrimes.map((time, index) => (
              <tr key={index}>
                <th>{`${time.fromTime}-${time.toTime}`}</th>
                <td>{setCrime(time.fromTime, time.toTime, 0)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 1)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 2)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 3)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 4)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 5)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 6)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 7)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 8)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 9)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 10)}</td>
                <td>{setCrime(time.fromTime, time.toTime, 11)}</td>
                <td>{setCrimeFull(time.fromTime, time.toTime).crimeCount}</td>
                <td>{setCrimeFull(time.fromTime, time.toTime).crimePercent}</td>
                <td>
                  {setCrimeFull(time.fromTime, time.toTime).crimeTrufyPercent}
                </td>
                <td>
                  {setCrimeFull(time.fromTime, time.toTime).crimeFalsyPercent}
                </td>
              </tr>
            ))}
            <tr>
              <th>Общий итог</th>
              <td>{setEnd(0)}</td>
              <td>{setEnd(1)}</td>
              <td>{setEnd(2)}</td>
              <td>{setEnd(3)}</td>
              <td>{setEnd(4)}</td>
              <td>{setEnd(5)}</td>
              <td>{setEnd(6)}</td>
              <td>{setEnd(7)}</td>
              <td>{setEnd(8)}</td>
              <td>{setEnd(9)}</td>
              <td>{setEnd(10)}</td>
              <td>{setEnd(11)}</td>
              <td>{list.length !== 0 ? list.length : 0}</td>
              <td>{list.length !== 0 ? 100 : 0}</td>
              <td>{memoFullPercent.trufyPercent}</td>
              <td>{memoFullPercent.trufyPercent}</td>
            </tr>
            <tr>
              <th>в %</th>
              <td>{fullAll(0)}</td>
              <td>{fullAll(1)}</td>
              <td>{fullAll(2)}</td>
              <td>{fullAll(3)}</td>
              <td>{fullAll(4)}</td>
              <td>{fullAll(5)}</td>
              <td>{fullAll(6)}</td>
              <td>{fullAll(7)}</td>
              <td>{fullAll(8)}</td>
              <td>{fullAll(9)}</td>
              <td>{fullAll(10)}</td>
              <td>{fullAll(11)}</td>
              <td>{list.length !== 0 ? 100 : 0}</td>
              <td>{list.length !== 0 ? 100 : 0}</td>
              <td>{memoFullPercent.trufyPercent}</td>
              <td>{memoFullPercent.trufyPercent}</td>
            </tr>
          </tbody>
        </table>
      </TableDiv>
      <h4>
        Вывод: Ежедневный анализ по видам преступлений и времени показывает __%
        совершено с ___ часов
      </h4>
    </Fragment>
  );
});
