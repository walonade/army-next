import React, { Fragment, useMemo } from "react";
import TableDiv from "./../TableDiv";
import TableHead from "./../TableHead";
import { timeofCrimes } from "./../../data";
import withStore from "./../../utils/withStore.js";
import { setTitleDate } from "./../../data";
export default withStore(props => {
  const titleDate = useMemo(() => setTitleDate(props.store.toDate), [
    props.store.toDate.get("date")
  ]);
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
            {timeofCrimes.map(time => (
              <tr key={time}>
                <th>{time}</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
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
