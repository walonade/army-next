import { action, observable, computed } from "mobx"
import fetch from "isomorphic-unfetch"
export default class {
 constructor(rootStore) {
  this.rootStore = rootStore
 }
 @observable addresses = []
 @observable addressesForAdmin = []
 @action async getAdresses() {
  try {
   const response = await fetch("/api/address")
   if (response.status === 200) {
    this.addresses = await response.json()
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @action async removeAddress(id) {
  try {
   const response = await fetch(`/api/admin/address/${id}`, {
    method: "DELETE",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     Accept: "application/json",
    },
   })
   if (response.status === 204) {
    this.addressesForAdmin = this.addressesForAdmin.filter(
     item => item.id !== id
    )
    this.rootStore.NotificationStore.add("удалено", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @action async addAddress(data) {
  try {
   const response = await fetch("/api/admin/address/add", {
    method: "POST",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     "Content-type": "application/json",
     Accept: "application/json",
    },
    body: JSON.stringify(data),
   })
   if (response.status === 201) {
    this.addressesForAdmin = [...this.addressesForAdmin, await response.json()]
    this.rootStore.NotificationStore.add("адрес добавлен", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @action async getAllAddresses() {
  try {
   const response = await fetch("/api/admin/address/get", {
    method: "GET",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     Accept: "application/json",
    },
   })
   if (response.status === 200) {
    this.addressesForAdmin = [...(await response.json())]
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @computed get deleteInListAddress() {
  return this.addressesForAdmin.map(item => () => this.removeAddress(item.id))
 }
}
