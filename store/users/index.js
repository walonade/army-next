import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable users = [];
  @action async createUser(data) {
    try {
      const response = await fetch("/api/admin/users/create", {
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
      }
    } catch (e) {
      console.log(e);
    }
  }
  @action async removeUser(id) {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      if (response.status === 200) {
        this.users = this.users.filter(item => item.id !== id);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @action async getAllUsers() {
    try {
      const response = await fetch("/api/admin/users/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      const json = await response.json();
      this.users = [...json];
    } catch (e) {
      console.log(e);
    }
  }
  @computed get deleteInListUser() {
    return this.users.map(item => () => this.removeUser(item.id));
  }
}
