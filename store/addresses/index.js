import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable addresses = [];
  @observable addressesForAdmin = [];
  @action async getAdresses() {
    const response = await fetch("/api/address");
    const data = await response.json();
    this.addresses = data;
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
        this.rootStore.NotificationStore.add("удалено", "success")
      }
      if (response.status === 401 || response.status === 500) {
        const json = await response.json()
        this.rootStore.NotificationStore.add(json.message)
      }
    } catch (e) {}
  }
  @action async changeAddress(id) {
    try {
      const response = await fetch(`/api/admin/address/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.rootStore.token}`,
          "Content-type": "application/json",
          Accept: "application/json"
        }
      });
      if (response.status === 200) {
        const json = await response.json();
        this.addressesForAdmin = this.addressesForAdmin.filter(
          item => item.id !== id
        );
        this.addressesForAdmin = [...this.addressesForAdmin, json];
      }
    } catch (e) {}
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
      this.addressesForAdmin = [...json];
    } catch (e) {}
  }
  @computed get changeAddressList() {
    return this.addressesForAdmin.map(item => () =>
      this.changeAddress(item.id)
    );
  }
  @computed get deleteInListAddress() {
    return this.addressesForAdmin.map(item => () =>
      this.removeAddress(item.id)
    );
  }
}
