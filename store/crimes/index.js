import { action, observable, computed } from "mobx"
import fetch from "isomorphic-unfetch"
import moment from "moment"
import { dayOfWeek } from "./../../data"
export default class {
 constructor(rootStore) {
  this.rootStore = rootStore
 }
 @observable crimes = []
 @action async getCrimes() {
  try {
   this.rootStore.setFetching(true)
   const from = this.rootStore.fromDate.toISOString()
   const to = this.rootStore.toDate.toISOString()
   const response = await fetch(`/api/crime/get?from=${from}&to=${to}`, {
    method: "GET",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     Accept: "application/json",
    },
   })
   if (response.status === 200) {
    this.crimes = await response.json()
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  } finally {
   this.rootStore.setFetching(false)
  }
 }
 @action async addToCrimes(data) {
  try {
   this.rootStore.setFetching(true)
   const response = await fetch("/api/crime/add", {
    method: "POST",
    credentials: "include",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     "Content-type": "application/json",
     Accept: "application/json",
    },
    body: JSON.stringify(data),
   })
   if (response.status === 201) {
    const json = await response.json()
    const fixResData = {
     ...json.crime,
     AddressId: json.addressData,
    }
    this.crimes = [...this.crimes, fixResData]
    this.rootStore.NotificationStore.add("добавлено", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  } finally {
   this.rootStore.setFetching(false)
  }
 }
 @action async removeFromCrimes(id) {
  try {
   this.rootStore.setFetching(true)
   const response = await fetch(`/api/crime/${id}`, {
    method: "DELETE",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
    },
   })
   if (response.status === 204) {
    this.crimes = this.crimes.filter(item => item.id !== id)
    this.rootStore.NotificationStore.add("удалено", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  } finally {
   this.rootStore.setFetching(false)
  }
 }
 @computed get deleteInListCrimes() {
  return this.crimes.map(item => () => this.removeFromCrimes(item.id))
 }
 @computed get updatedCrimes() {
  this.crimes.map(item =>
   Object.defineProperties(item, {
    compDate: {
     writable: true,
     value: moment(item.date).format("DD.MM.YYYY"),
    },
    compTime: {
     writable: true,
     value: moment(item.date).format("HH:mm"),
    },
    compDayOfWeek: {
     writable: true,
     value: dayOfWeek(item.date),
    },
   })
  )
  return this.crimes
 }
}
