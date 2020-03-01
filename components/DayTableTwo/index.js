import React, { Fragment } from "react";
import TableDiv from "./../TableDiv";
import TableHead from "./../TableHead";
import { timeofCrimes } from "./../../data";
export default () => {
  return (
    <Fragment>
      <TableDiv>
        <h3>
          Ежедневный анализ
          <br /> по видам преступлений и времени совершённых на улицах на «___»
          _________ 20г
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
};
