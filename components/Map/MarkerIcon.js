import moment from "moment";
import L from "leaflet";
const cutWord = string => {
  const wordsArr = string.split(" ");
  let finWord = "";
  wordsArr.forEach(word => finWord = finWord + word[0])
  return finWord.toUpperCase()
};
const changeNumber = number => {
  return number < 10 ? `0${number}` : number;
};
export default (t, d) => {
  const date = moment(d);
  const hour = date.hour();
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
    html: `<div><p>«${type}»</p><div>`,
    className: `${className}-circle circle`,
    iconSize: [50, 50]
  });
};
