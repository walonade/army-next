import moment from "moment"
import L from "leaflet"
import { serviceList } from "../../data"
const cutWord = string => {
 const wordsArr = string.split(" ")
 let finWord = ""
 wordsArr.forEach(word => (finWord = finWord + word[0]))
 return finWord.toUpperCase()
}
const showLines = string => {
 const obj = {
  rigthShow: false,
  leftShow: false,
 }
 switch (string) {
  case serviceList[0]:
   return obj
   break
  case serviceList[1]:
   return { ...obj, rigthShow: true, leftShow: true }
   break
  case serviceList[2]:
   return {
    ...obj,
    rigthShow: true,
   }
  default:
   return obj
   break
 }
}
export default (t, d, s) => {
 const styleLine = showLines(s)
 const date = moment(d)
 const setDate = moment(d).format("DD.MM.YYYY").toString()
 const hour = date.hour()
 const type = cutWord(t)
 let className
 if (hour >= 8 && hour <= 17) {
  className = "blue"
 } else if (hour >= 18 && hour <= 23) {
  className = "red"
 } else if (hour >= 0 && hour <= 7) {
  className = "green"
 }
 return L.divIcon({
  html: `<div>
    <span class="type-font">«${type}»</span>
    <span class="date-font">${setDate}</span>
     ${styleLine.rigthShow ? `<div class="line to-right"></div>` : ""}
     ${styleLine.leftShow ? `<div class="line to-left"></div>` : ""}
   <div>`,
  className: `${className}-circle circle`,
  iconSize: [50, 50],
 })
}
