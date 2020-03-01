import React, { Fragment } from "react";
import styled from "styled-components";
import TableDiv from "./../TableDiv";
export default () => {
  return (
    <Fragment>
      <TableDiv>
        <h3>
          Ежедневный анализ
          <br /> криминогенной обстановки по преступлениям совершённых на улицах
          на «___» ______ 2020г
        </h3>
        <table>
          <thead>
            <tr>
              <th>№<br/>п/п</th>
              <th>виды<br/>преступления</th>
              <th>дата<br/>совершения</th>
              <th>№<br/>КУЗ</th>
              <th>место<br/>совершения</th>
              <th>служба<br/>раскрывшая</th>
              <th>Объект<br/>преступления</th>
              <th>Время<br/>совершения</th>
              <th>день<br/>недели</th>
              <th>допущены на<br/>маршр. патрул в/нарядов</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={10}>Северный отдел полиции</th>
            </tr>
            <tr>
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
            <tr>
              <th colSpan={10}>Центральный отдел полиции</th>
            </tr>
            <tr>
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
            <tr>
              <th colSpan={10}>Южный отдел полиции</th>
            </tr>
            <tr>
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
          </tbody>
        </table>
      </TableDiv>
      <p>
        За _____ совершено __ преступлений на улицах г. Павлодар, <br />
        По северному отделу полиции-__ из них раскрыто-__ нераскрыто-__ <br />
        По центральному отделу полиции-__ из них раскрыто-__ нераскрыто-__
        <br />
        По южному отделу полиции-__ из них раскрыто-__ нераскрыто-__ <br />
        Вывод: Криминогенным районом является ____________
      </p>
    </Fragment>
  );
};
