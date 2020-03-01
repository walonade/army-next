import React, { Fragment } from "react";
import styled from "styled-components";
import TableDiv from "./../TableDiv";
import TableHead from "./../TableHead";
import { weekDays } from "./../../data";
export default () => {
  return (
    <Fragment>
      <TableDiv>
        <h3>
          Еженедельный анализ
          <br />
          по видам преступлений и дням недели совершённые на улицах с __ по __
          2020г
        </h3>
        <table>
          <TableHead week={true} />
          <tbody>
            {weekDays.map(item => (
              <tr key={item}>
                <th>{item}</th>
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
    </Fragment>
  );
};
