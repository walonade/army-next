import { action, observable, computed } from "mobx";
import { useStaticRendering } from "mobx-react";
import fetch from "isomorphic-unfetch";
import moment from "moment";
import cookie from "js-cookie";
const isServer = typeof window === "undefined";
useStaticRendering(isServer);
export class Store {
  @observable lastUpdate = 0;
  @observable light = false;
  @observable crimes = [];
  @observable addresses = [];
  hydrate(serializedStore) {
    this.lastUpdate =
      serializedStore.lastUpdate != null
        ? serializedStore.lastUpdate
        : Date.now();
    this.light = !!serializedStore.light;
  }
  @action async getCrimes() {
    const token = cookie.get("token");
    const response = await fetch("/api/crime/get", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      }
      // body: JSON.stringify(data)
    });
    const resData = await response.json();
    this.crimes = resData;
  }
  @action async addToCrimes(data) {
    const token = cookie.get("token");
    const response = await fetch("/api/crime/add", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });
    const resdata = await response.json();
    // this.crimes = [...this.crimes, resdata];
  }
  @action async getAdresses() {
    const response = await fetch("/api/address");
    const data = await response.json();
    this.addresses = data;
  }
}

export async function fetchInitialStoreState() {
  return {};
}
