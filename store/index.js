import { action, observable, computed } from "mobx";
import { useStaticRendering } from "mobx-react";
import fetch from "isomorphic-unfetch";
import moment from "moment";
import cookie from "js-cookie";
const isServer = typeof window === "undefined";
useStaticRendering(isServer);
const crimesData = [
  {
    type: "Убийство",
    date: moment(),
    address: "Сураганова 10",
    service: "we",
    object: "Иванов Иван Иваныч",
    rota: 3,
    kui: 345345454545,
    lat: -120.75,
    lng: 70.85416412353516
  },
  {
    type: "Грабёж",
    date: moment(),
    address: "Сураганова 52",
    service: "we",
    object: "Иванов Иван Иваныч",
    rota: 2,
    kui: 34534454545,
    lat: -121.5,
    lng: 74.35416412353516
  },
  {
    type: "Хол. оружие",
    date: moment(),
    address: "Сураганова 123",
    service: "we",
    object: "Иванов Иван Иваныч",
    rota: 1,
    kui: 34556564545,
    lat: -103.625,
    lng: 79.60416412353516
  }
];
export class Store {
  @observable lastUpdate = 0;
  @observable light = false;
  @observable crimes = crimesData;
  @observable addresses = []
  hydrate(serializedStore) {
    this.lastUpdate =
      serializedStore.lastUpdate != null
        ? serializedStore.lastUpdate
        : Date.now();
    this.light = !!serializedStore.light;
  }
  @action async addToCrimes(data) {
    const dataWithPosition = { ...data, lat: -140.25, lng: 69.35416412353516 };
    this.crimes = [...this.crimes, dataWithPosition];
    const token = cookie.get("token")
    console.log(JSON.stringify({ token }))
    const response = await fetch("/api/crime/add", {
      method: "POST",
      credentials: 'include',
      headers: {
         Authorization: JSON.stringify({ token: `Bearer ${token}` }),
      },
      body: this.crimes
    })
    const resdata = await response.json()
  }
  @action async getAdresses() {
    const response = await fetch("/api/address")
    const data = await response.json()
    this.addresses = data
  }
}

export async function fetchInitialStoreState() {
  return {};
}
