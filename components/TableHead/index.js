export default props => {
  const season = props.week ? (
    <th>
      День
      <br />
      недели
    </th>
  ) : (
    <th>
      Время
      <br />
      суток
    </th>
  );
  return (
    <thead>
      <tr>
        {season}
        <th>Убийство</th>
        <th>УПВЗ</th>
        <th>Изнасилование</th>
        <th>Грабёж</th>
        <th>Кража</th>
        <th>Разбой</th>
        <th>Хулиганство</th>
        <th>Угон</th>
        <th>Мошенничество</th>
        <th>Наркотик</th>
        <th>
          Мелкое
          <br />
          хищение
        </th>
        <th>
          Хол.
          <br />
          оружие
        </th>
        <th>итого</th>
        <th>В %</th>
        <th>
          раскр.
          <br />%
        </th>
        <th>
          нераскр
          <br />%
        </th>
      </tr>
    </thead>
  );
};
