import { action, observable, computed } from "mobx"
import fetch from "isomorphic-unfetch"
import Router from "next/router"
export default class {
 constructor(rootStore) {
  this.rootStore = rootStore
 }
 @observable users = []
 @action async createUser(data) {
  try {
   const response = await fetch("/api/admin/user/create", {
    method: "POST",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     "Content-type": "application/json",
     Accept: "application/json",
    },
    body: JSON.stringify(data),
   })
   if (response.status === 201) {
    this.users = [...this.users, await response.json()]
    this.rootStore.NotificationStore.add("добавлено", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @action async removeUser(id) {
  try {
   const response = await fetch(`/api/admin/user/${id}`, {
    method: "DELETE",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
    },
   })
   if (response.status === 204) {
    this.users = this.users.filter(item => item.id !== id)
    this.rootStore.NotificationStore.add("удалено", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @action async getAllUsers() {
  try {
   const response = await fetch("/api/admin/user/get", {
    method: "GET",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     Accept: "application/json",
    },
   })
   if (response.status === 200) {
    this.users = [...(await response.json())]
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  }
 }
 @action async login(url, data) {
  try {
   this.rootStore.setFetching(true)
   const response = await fetch(`/api/${url}/login`, {
    method: "POST",
    headers: {
     "Content-type": "application/json",
     Accept: "application/json",
    },
    body: JSON.stringify(data),
   })
   if (response.status === 200) {
    const { token } = await response.json()
    this.rootStore.setToken(token)
    url === "admin"
     ? this.rootStore.setAdmin(true)
     : this.rootStore.setAdmin(false)
    url === "admin" ? Router.push("/admin") : Router.push("/public")
    this.rootStore.NotificationStore.add("добро пожаловать", "info")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  } finally {
   this.rootStore.setFetching(false)
  }
 }
 @action async changeAdminPassword(password) {
  try {
   this.rootStore.setFetching(true)
   const response = await fetch("/api/admin/user/change_password", {
    method: "PUT",
    headers: {
     Authorization: `Bearer ${this.rootStore.token}`,
     "Content-type": "application/json",
     Accept: "application/json",
    },
    body: JSON.stringify({ password }),
   })
   if (response.status === 202) {
    this.rootStore.NotificationStore.add("пароль успешно изменён", "success")
   } else {
    this.rootStore.serverMistakes(response.status)
   }
  } catch (e) {
   console.log(e)
  } finally {
   this.rootStore.setFetching(false)
  }
 }
 @computed get deleteInListUser() {
  return this.users.map(item => () => this.removeUser(item.id))
 }
}
