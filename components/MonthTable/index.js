import React, { Fragment } from "react";
import TableDiv from "./../TableDiv";
import { kindOfCrimeData } from "./../../data";
export default () => {
  return (
    <Fragment>
      <TableDiv>
        <h2>Анализ</h2>
        <h3>
          совершённых преступлений по оперативной сводке на территории г.
          Павлодар с __ года по __ года
          <br />
          зарегистрировано на улицах __, в 2020 году зарегистрировано на улицах
          __ преступлений.
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
              <th colSpan={2}>Северный ОП</th>
              <th colSpan={2}>Центральный ОП</th>
              <th colSpan={2}>Южный ОП</th>
              <th>Всего</th>
            </tr>
            <tr>
              <td>2019</td>
              <td>2020</td>
              <td>2019</td>
              <td>2020</td>
              <td>2019</td>
              <td>2020</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {kindOfCrimeData.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
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
              <th>2019 год</th>
              <th>2020 год</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Северный ОП</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Центральный ОП</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Южный ОП</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Всего</th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </TableDiv>
      <h4>По территориальности креминогенными районами являются:</h4>
      <h5>_________ ОП, где допущено __ преступлений на улицах</h5>
      <h5>_________ ОП, где допущено __ преступлений на улицах</h5>
      <h5>_________ ОП, где допущено __ преступлений на улицах</h5>
    </Fragment>
  );
};
