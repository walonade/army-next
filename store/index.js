import { action, observable, computed } from "mobx";
import { useStaticRendering } from "mobx-react";
import cookie from "js-cookie";
import moment from "moment";
const isServer = typeof window === "undefined";
import UserStore from "./users";
import AddressStore from "./addresses";
import CrimeStore from "./crimes";
import NotificationStore from "./notification"
import CrimesTableStore from "./crimesTable"
useStaticRendering(isServer);
export class Store {
  constructor() {
    this.UserStore = new UserStore(this);
    this.AddressStore = new AddressStore(this);
    this.CrimeStore = new CrimeStore(this);
    this.NotificationStore = new NotificationStore(this)
    this.CrimesTableStore = new CrimesTableStore(this)
    this.token = cookie.get("token");
    this.isAdmin = cookie.get("isAdmin");
  }
  @observable lastUpdate = 0;
  @observable light = false;
  @observable fromDate = moment();
  @observable toDate = moment();
  @action setFromDate(time) {
    this.fromDate = time;
  }
  @action setToDate(time) {
    this.toDate = time;
  }
  @computed get gapDate() {
    return this.toDate.diff(this.fromDate, "days");
  }
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
