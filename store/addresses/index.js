import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable addresses = [];
  @observable addressesForAdmin = [];
  @action async getAdresses() {
    try {
      const response = await fetch("/api/address");
      const json = await response.json();
      if (response.status === 200) {
        this.addresses = json;
      } else {
        throw new Error(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @action async removeAddress(id) {
    try {
      const response = await fetch(`/api/admin/address/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      if (response.status === 200) {
        this.addressesForAdmin = this.addressesForAdmin.filter(
          item => item.id !== id
        );
        this.rootStore.NotificationStore.add("удалено", "success");
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @action async addAddress(data) {
    try {
      const response = await fetch("/api/admin/address/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      if (response.status === 200) {
        this.addressesForAdmin = [...this.addressesForAdmin, json];
        this.rootStore.NotificationStore.add("адрес добавлен", "success");
      } else {
        throw new Error(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @action async getAllAddresses() {
    try {
      const response = await fetch("/api/admin/address/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      const json = await response.json();
      if (response.status === 200) {
        this.addressesForAdmin = [...json];
      } else {
        this.rootStore.NotificationStore.add(json.message);
      }
    } catch ({ message }) {
      this.rootStore.NotificationStore.add(message);
    }
  }
  @computed get deleteInListAddress() {
    return this.addressesForAdmin.map(item => () =>
      this.removeAddress(item.id)
    );
  }
}
