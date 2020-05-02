import { action, observable, computed } from "mobx"
import { useStaticRendering } from "mobx-react"
import cookie from "js-cookie"
import moment from "moment"
const isServer = typeof window === "undefined"
import Router from "next/router"
import UserStore from "./users"
import AddressStore from "./addresses"
import CrimeStore from "./crimes"
import NotificationStore from "./notification"
import CrimesTableStore from "./crimesTable"
useStaticRendering(isServer)
export class Store {
 constructor() {
  this.UserStore = new UserStore(this)
  this.AddressStore = new AddressStore(this)
  this.CrimeStore = new CrimeStore(this)
  this.NotificationStore = new NotificationStore(this)
  this.CrimesTableStore = new CrimesTableStore(this)
 }
 serverMistakes = status => {
  switch (status) {
   case 208:
    this.NotificationStore.add("уже существует", "info")
    break
   case 401:
    this.NotificationStore.add("ошибка авторизации")
    break
   case 500:
    this.NotificationStore.add("возникли проблемы с сервером")
    break
   default:
    this.NotificationStore.add("возникла неизвестная ошибка")
  }
 }
 @observable lastUpdate = 0
 @observable light = false
 @observable fromDate = moment()
 @observable toDate = moment()
 @observable token = cookie.get("token") || null
 @observable isAdmin = cookie.get("isAdmin") || false
 @observable isPrint = false
 @action setPrint(boolean) {
  this.isPrint = boolean
 }
 @action setToken(token) {
  cookie.set("token", token, { expires: 1 })
  this.token = token
 }
 @action setAdmin(boolean) {
  boolean
   ? cookie.set("isAdmin", boolean, { expires: 1 })
   : cookie.remove("isAdmin")
  this.isAdmin = boolean
 }
 @action logout = () => {
  const isAdmin = cookie.get("isAdmin")
  let url = "/public"
  if (isAdmin) {
   url = "/admin"
   cookie.remove("isAdmin")
  }
  cookie.remove("token")
  this.token = null
  this.isAdmin = false
  this.CrimeStore.crimes = []
  window.localStorage.setItem("logout", Date.now())
  Router.push(`${url}/login`)
 }
 @action setFromDate(time) {
  this.fromDate = time
 }
 @action setToDate(time) {
  this.toDate = time
 }
 @computed get gapDate() {
  return this.toDate.diff(this.fromDate, "days")
 }
 hydrate(serializedStore) {
  this.lastUpdate =
   serializedStore.lastUpdate != null ? serializedStore.lastUpdate : Date.now()
  this.light = !!serializedStore.light
 }
}
export async function fetchInitialStoreState() {
 return {}
}
