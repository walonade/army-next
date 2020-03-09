import React, { Fragment, memo, useMemo } from "react";
import TableDiv from "./../TableDiv";
import withStore from "./../../utils/withStore.js";
import moment from "moment";
import { setTitleDate } from "./../../data";
const Tr = memo(
  props => {
    const { item, index } = props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.type}</td>
        <td>{item.compDate}</td>
        <td>{item.kui}</td>
        <td>{item.address}</td>
        <td>{item.service}</td>
        <td>{item.object}</td>
        <td>{item.compTime}</td>
        <td>{item.compDayOfWeek}</td>
        <td></td>
      </tr>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id ? true : false
);
const EmptyTr = () => (
  <tr>
    {[...Array(10)].map((item, index) => (
      <td key={index}>-</td>
    ))}
  </tr>
);
export default withStore(props => {
  const {
    tableOneNorth,
    tableOneCenter,
    tableOneSouth
  } = props.store.CrimesTableStore;
  let checkMemo = props.store.toDate.get("date");
  const { updatedCrimes } = props.store.CrimeStore;
  const titleDate = useMemo(() => setTitleDate(props.store.toDate), [
    checkMemo
  ]);
  const textDate = useMemo(() => props.store.toDate.format("DD.MM.YYYY"), [
    checkMemo
  ]);
  const countCrime = arr => {
    let data = { count: arr.length, trufy: 0, falsy: 0 };
    arr.map(item => {
      item.service === "не раскрыто"
        ? (data = { ...data, falsy: data.falsy + 1 })
        : (data = { ...data, trufy: data.trufy + 1 });
    });
    return data;
  };
  const crimeWord = (n, text_forms) => {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) return text_forms[2];
    if (n1 > 1 && n1 < 5) return text_forms[1];
    if (n1 == 1) return text_forms[0];
    return text_forms[2];
  };
  const memoizeWord = useMemo(
    () =>
      crimeWord(updatedCrimes.length, [
        "преступление",
        "преступления",
        "преступлений"
      ]),
    [updatedCrimes.length]
  );
  const countNorth = useMemo(() => countCrime(tableOneNorth), [
    tableOneNorth.length
  ]);
  const countCenter = useMemo(() => countCrime(tableOneCenter), [
    tableOneCenter.length
  ]);
  const countSouth = useMemo(() => countCrime(tableOneSouth), [
    tableOneSouth.length
  ]);
  const mostCriminal = useMemo(() => {
    const sortArr = [
      { name: "Северный", length: tableOneNorth.length },
      { name: "Центральный", length: tableOneCenter.length },
      { name: "Южный", length: tableOneSouth.length }
    ];
    sortArr.sort((a, b) =>  b.length - a.length);
    return updatedCrimes.length === 0 ? "___________" : sortArr[0].name;
  }, [updatedCrimes.length]);

  return (
    <Fragment>
      <TableDiv>
        <h3>
          Ежедневный анализ
          <br /> криминогенной обстановки по преступлениям совершённых на улицах
          на «<u> {titleDate.day} </u>» <u>{titleDate.month}</u>&nbsp;
          {titleDate.year}г.
        </h3>
        <table>
          <thead>
            <tr>
              <th>
                №<br />
                п/п
              </th>
              <th>
                виды
                <br />
                преступления
              </th>
              <th>
                дата
                <br />
                совершения
              </th>
              <th>
                №<br />
                КУЗ
              </th>
              <th>
                место
                <br />
                совершения
              </th>
              <th>
                служба
                <br />
                раскрывшая
              </th>
              <th>
                Объект
                <br />
                преступления
              </th>
              <th>
                Время
                <br />
                совершения
              </th>
              <th>
                день
                <br />
                недели
              </th>
              <th>
                допущены на
                <br />
                маршр. патрул в/нарядов
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={10}>Северный отдел полиции</th>
            </tr>
            {tableOneNorth.length !== 0 ? (
              tableOneNorth.map((item, index) => (
                <Tr key={item.id} item={item} index={index} />
              ))
            ) : (
              <EmptyTr />
            )}
            <tr>
              <th colSpan={10}>Центральный отдел полиции</th>
            </tr>
            {tableOneCenter.length !== 0 ? (
              tableOneCenter.map((item, index) => (
                <Tr key={item.id} item={item} index={index} />
              ))
            ) : (
              <EmptyTr />
            )}
            <tr>
              <th colSpan={10}>Южный отдел полиции</th>
            </tr>
            {tableOneSouth.length !== 0 ? (
              tableOneSouth.map((item, index) => (
                <Tr key={item.id} item={item} index={index} />
              ))
            ) : (
              <EmptyTr />
            )}
          </tbody>
        </table>
      </TableDiv>
      <p>
        За <u>{textDate}</u> совершено <u>{updatedCrimes.length}</u>{" "}
        {memoizeWord} на улицах г. Павлодар, <br />
        По северному отделу полиции - <u>{countNorth.count}</u> из них раскрыто
        - <u>{countNorth.trufy}</u> нераскрыто - <u>{countNorth.falsy}</u>{" "}
        <br />
        По центральному отделу полиции - <u>{countCenter.count}</u> из них
        раскрыто - <u>{countCenter.trufy}</u> нераскрыто -{" "}
        <u>{countCenter.falsy}</u>
        <br />
        По южному отделу полиции - <u>{countSouth.count}</u> из них раскрыто -{" "}
        <u>{countSouth.trufy}</u> нераскрыто - <u>{countSouth.falsy}</u>
        <br />
        Вывод: Криминогенным районом является <u>{mostCriminal}</u>
      </p>
    </Fragment>
  );
});
