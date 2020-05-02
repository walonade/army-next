import { computed } from "mobx"

export default class {
 constructor(rootStore) {
  this.rootStore = rootStore
 }
 @computed get tableOneNorth() {
  let arr = []
  this.rootStore.CrimeStore.updatedCrimes.forEach(item => {
   if (item.AddressId.patrol === "Северный") arr = [...arr, item]
  })
  return arr
 }
 @computed get tableOneCenter() {
  let arr = []
  this.rootStore.CrimeStore.updatedCrimes.forEach(item => {
   if (item.AddressId.patrol === "Центральный") arr = [...arr, item]
  })
  return arr
 }
 @computed get tableOneSouth() {
  let arr = []
  this.rootStore.CrimeStore.updatedCrimes.forEach(item => {
   if (item.AddressId.patrol === "Южный") arr = [...arr, item]
  })
  return arr
 }
}
