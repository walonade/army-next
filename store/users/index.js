import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import cookie from "js-cookie";
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
        this.rootStore.serverMistakes(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @action async removeUser(id) {
    try {
      const response = await fetch(`/api/admin/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`
        }
      });
      if (response.status === 204) {
        this.users = this.users.filter(item => item.id !== id);
        this.rootStore.NotificationStore.add("удалено", "success");
      } else {
        this.rootStore.serverMistakes(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @action async getAllUsers() {
    try {
      const response = await fetch("/api/admin/user/get", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          Accept: "application/json"
        }
      });
      const json = await response.json();
      if (response.status === 200) {
        this.users = [...json];
      } else {
        this.rootStore.serverMistakes(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @action async login(url, data) {
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
        this.rootStore.setToken(token);
        url === "admin"
          ? this.rootStore.setAdmin(true)
          : this.rootStore.setAdmin(false);
        url === "admin" ? Router.push("/admin") : Router.push("/public");
        this.rootStore.NotificationStore.add("добро пожаловать", "info");
      } else {
        this.rootStore.serverMistakes(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @computed get deleteInListUser() {
    return this.users.map(item => () => this.removeUser(item.id));
  }
}
