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
    try {
      const response = await fetch("/api/admin/user/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (response.status === 201) {
        this.users = [...this.users, json];
        this.rootStore.NotificationStore.add("добавлено", "success");
      } else {
        this.rootStore.NotificationStore.add(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @action async removeUser(id) {
    try {
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
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @action async getAllUsers() {
    try {
      const response = await fetch("/api/admin/user/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      const json = await response.json();
      if (response.status === 200) {
        this.users = [...json];
      } else {
        throw new Error(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @action async login(url, data, isAdmin = false) {
    try {
      const response = await fetch(`/api/${url}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (response.status === 200) {
        const { token } = json;
        setToken(token);
        isAdmin ? setAdmin(true) : null;
        isAdmin ? Router.push("/admin") : Router.push("/public");
        this.rootStore.NotificationStore.add("добро пожаловать", "info");
      } else {
        throw new Error(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @computed get deleteInListUser() {
    return this.users.map(item => () => this.removeUser(item.id));
  }
}
