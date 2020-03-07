import { action, observable, computed } from "mobx";
import fetch from "isomorphic-unfetch";
export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable crimes = [];
  @action async getCrimes(data) {
    const response = await fetch("/api/crime/get", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${this.rootStore.token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    const resData = await response.json();
    this.crimes = resData;
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
    if (response.status === 200) {
      this.crimes = this.crimes.filter(item => item.id !== id);
    }
  }
  @computed get deleteInListCrimes() {
    return this.crimes.map(item => () => this.removeFromCrimes(item.id));
  }
}
