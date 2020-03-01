import moment from "moment";
import L from "leaflet";
const cutWord = string => {
  return `${string[0]}${string[1]}`.toUpperCase();
};
const changeNumber = number => {
  return number < 10 ? `0${number}` : number;
};
export default (t, d) => {
  const date = moment(d);
  const year = date.year();
  const month = date.month();
  const day = date.date();
  const hour = date.hour();
  const minute = date.minute();
  const setDate = `${changeNumber(day)}.${changeNumber(month)}.${year}`;
  const setTime = `${hour}.${minute}`;
  const type = cutWord(t);
  let className;
  if (hour >= 8 && hour <= 17) {
    className = "blue";
  } else if (hour >= 18 && hour <= 23) {
    className = "red";
  } else if (hour >= 0 && hour <= 7) {
    className = "green";
  }
  return L.divIcon({
    html: `<div><p>«${type}»</p><p>${setDate}</p><p>вр.${setTime}</p><div>`,
    className: `${className}-circle circle`,
    iconSize: [50, 50]
  });
};
