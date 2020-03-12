import React, { Fragment, useMemo } from "react";
import withStore from "./../../utils/withStore.js";
import TableDiv from "./../TableDiv";
import TableHead from "./../TableHead";
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
    <Fragment>
      <TableDiv>
        <h3>
          Еженедельный анализ
          <br />
          по видам преступлений и дням недели совершённые на улицах с{" "}
          <u>{textDate.fromDate}</u> по <u>{textDate.toDate}</u> {textDate.year}
          г.
        </h3>
        <table>
          <TableHead week={true} />
          <tbody>
            {days.map(item => (
              <tr key={item}>
                <th>{item}</th>
                <td>{setCrime(item, 0)}</td>
                <td>{setCrime(item, 1)}</td>
                <td>{setCrime(item, 2)}</td>
                <td>{setCrime(item, 3)}</td>
                <td>{setCrime(item, 4)}</td>
                <td>{setCrime(item, 5)}</td>
                <td>{setCrime(item, 6)}</td>
                <td>{setCrime(item, 7)}</td>
                <td>{setCrime(item, 8)}</td>
                <td>{setCrime(item, 9)}</td>
                <td>{setCrime(item, 10)}</td>
                <td>{setCrime(item, 11)}</td>
                <td>{crimeWeek(item)}</td>
                <td>{crimeWeekPercent(item).percent}</td>
                <td>{crimeWeekPercent(item).trufyPercent}</td>
                <td>{crimeWeekPercent(item).falsyPercent}</td>
              </tr>
            ))}
            <tr>
              <th>Общий итог</th>
              <td>{crimeType(0)}</td>
              <td>{crimeType(1)}</td>
              <td>{crimeType(2)}</td>
              <td>{crimeType(3)}</td>
              <td>{crimeType(4)}</td>
              <td>{crimeType(5)}</td>
              <td>{crimeType(6)}</td>
              <td>{crimeType(7)}</td>
              <td>{crimeType(8)}</td>
              <td>{crimeType(9)}</td>
              <td>{crimeType(10)}</td>
              <td>{crimeType(11)}</td>
              <td>{list.length != 0 ? list.length : 0}</td>
              <td>{percent}</td>
              <td>{fullPercent.trufyPercent}</td>
              <td>{fullPercent.falsyPercent}</td>
            </tr>
            <tr>
              <th>В %</th>
              <td>{percentType(0)}</td>
              <td>{percentType(1)}</td>
              <td>{percentType(2)}</td>
              <td>{percentType(3)}</td>
              <td>{percentType(4)}</td>
              <td>{percentType(5)}</td>
              <td>{percentType(6)}</td>
              <td>{percentType(7)}</td>
              <td>{percentType(8)}</td>
              <td>{percentType(9)}</td>
              <td>{percentType(10)}</td>
              <td>{percentType(11)}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </TableDiv>
    </Fragment>
  );
});
