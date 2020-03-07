import { action, observable, computed } from "mobx";
import { useStaticRendering } from "mobx-react";
import cookie from "js-cookie";
const isServer = typeof window === "undefined";
import UserStore from "./users"
import AddressStore from "./addresses"
import CrimeStore from "./crimes"
useStaticRendering(isServer);
export class Store {
  constructor() {
    this.UserStore = new UserStore(this)
    this.AddressStore = new AddressStore(this)
    this.CrimeStore = new CrimeStore(this)
    this.token = cookie.get("token")
  }
  @observable lastUpdate = 0;
  @observable light = false;

  hydrate(serializedStore) {
    this.lastUpdate =
      serializedStore.lastUpdate != null
        ? serializedStore.lastUpdate
        : Date.now();
    this.light = !!serializedStore.light;
  }
}

export async function fetchInitialStoreState() {
  return {};
}
