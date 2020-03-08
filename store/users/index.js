import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import { setToken, setAdmin } from "./../../utils/auth.js";
export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable users = [];
  @action async createUser(data) {
    const response = await fetch("/api/admin/user/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 201) {
      const json = await response.json();
      this.users = [...this.users, json];
      this.rootStore.NotificationStore.add("добавлено", "success");
    }
    if (response.status === 401 || response.status === 500) {
      const json = await response.json();
      this.rootStore.NotificationStore.add(json.message);
    }
  }
  @action async removeUser(id) {
    const response = await fetch(`/api/admin/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      }
    });
    if (response.status === 200) {
      this.users = this.users.filter(item => item.id !== id);
      this.rootStore.NotificationStore.add("удалено", "success");
    }
    if (response.status === 401 || response.status === 500) {
      const json = await response.json();
      this.rootStore.NotificationStore.add(json.message);
    }
  }
  @action async getAllUsers() {
    const response = await fetch("/api/admin/user/get", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      }
    });
    const json = await response.json();
    this.users = [...json];
  }
  @action async login(url, data, isAdmin = false) {
    const response = await fetch(`/api/${url}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      const { token } = await response.json();
      setToken(token);
      isAdmin ? setAdmin(true) : null;
      isAdmin ? Router.push("/admin") : Router.push("/public");
      this.rootStore.NotificationStore.add("добро пожаловать", "info")
    }
    if (response.status === 401 || response.status === 500) {
      const json = await response.json()
      this.rootStore.NotificationStore.add(json.message)
    }
  }
  @computed get deleteInListUser() {
    return this.users.map(item => () => this.removeUser(item.id));
  }
}
