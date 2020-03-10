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
  {
    id: 0,
    fromTime: "00:00",
    toTime: "02:00"
  },
  {
    id: 1,
    fromTime: "02:00",
    toTime: "04:00"
  },
  {
    id: 2,
    fromTime: "04:00",
    toTime: "06:00"
  },
  {
    id: 3,
    fromTime: "06:00",
    toTime: "08:00"
  },
  {
    id: 4,
    fromTime: "08:00",
    toTime: "10:00"
  },
  {
    id: 5,
    fromTime: "10:00",
    toTime: "12:00"
  },
  {
    id: 6,
    fromTime: "12:00",
    toTime: "14:00"
  },
  {
    id: 7,
    fromTime: "14:00",
    toTime: "16:00"
  },
  {
    id: 8,
    fromTime: "16:00",
    toTime: "18:00"
  },
  {
    id: 9,
    fromTime: "18:00",
    toTime: "20:00"
  },
  {
    id: 10,
    fromTime: "20:00",
    toTime: "22:00"
  },
  {
    id: 11,
    fromTime: "22:00",
    toTime: "24:00"
  }
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
export {
  kindOfCrimeData,
  timeofCrimes,
  weekDays,
  dayOfWeek,
  monthOfYear,
  setTitleDate
};
