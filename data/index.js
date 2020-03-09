import moment from "moment";
const kindOfCrimeData = [
  "Убийство",
  "УПВЗ",
  "Изнасилование",
  "Грабёж",
  "Кража",
  "Разбой",
  "Хулиганство",
  "Угон",
  "Мошенничество",
  "Наркотик",
  "Мелкое хищение",
  "Хол. оружие"
];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
const timeofCrimes = [
  "00.00-02.00",
  "02.00-04.00",
  "04.00-06.00",
  "06.00-08.00",
  "08.00-10.00",
  "10.00-12.00",
  "12.00-14.00",
  "14.00-16.00",
  "16.00-18.00",
  "18.00-20.00",
  "20.00-22.00",
  "22.00-24.00",
  "Общий итог",
  "в %"
];
const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресение"
];
const weekDays = [...days, "Общий итог", "в %"];
const dayOfWeek = date => {
  const dayNumber = moment(date).weekday();
  return dayNumber === 0 ? days[6] : days[dayNumber - 1];
};
const monthOfYear = date => `${months[moment(date).month()].toLowerCase()}а`;
const setTitleDate = date => {
  return {
    day: date.get("date"),
    month: monthOfYear(date),
    year: date.get("year")
  };
};
export { kindOfCrimeData, timeofCrimes, weekDays, dayOfWeek, monthOfYear, setTitleDate };
