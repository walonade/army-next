import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable crimes = [];
  @action async getCrimes() {
    const data = {
      from: this.rootStore.fromDate,
      to: this.rootStore.toDate
    };
    const url = this.rootStore.isAdmin ? "admin/" : ""
    const response = await fetch(`/api/${url}crime/get`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) this.crimes = await response.json();
  }
  @action async addToCrimes(data) {
    const response = await fetch("/api/crime/add", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 201) {
      const resData = await response.json();
      const fixResData = { ...resData.crime, AddressId: resData.addressData };
      this.crimes = [...this.crimes, fixResData];
      this.rootStore.NotificationStore.add("добавлено", "success")
    }
    if (response.status === 401 || response.status === 500) {
      const json = await response.json()
      this.rootStore.NotificationStore.add(json.message)
    }
  }
  @action async removeFromCrimes(id) {
    const response = await fetch(`/api/crime/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      }
    });
    if (response.status === 204) {
      this.crimes = this.crimes.filter(item => item.id !== id);
      this.rootStore.NotificationStore.add("удалено", "success")
    }
    if (response.status === 401 || response.status === 500) {
      const json = await response.json()
      this.rootStore.NotificationStore.add(json.message)
    }
  }
  @computed get deleteInListCrimes() {
    return this.crimes.map(item => () => this.removeFromCrimes(item.id));
  }
}
