import { action, observable, computed } from "mobx";

export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @computed get tableOneNorth() {
    let arr = [];
    this.rootStore.CrimeStore.updatedCrimes.forEach(item => {
      if (item.patrol === "Северный") arr = [...arr, item];
    });
    return arr;
  }
  @computed get tableOneCenter() {
    let arr = [];
    this.rootStore.CrimeStore.updatedCrimes.forEach(item => {
      if (item.patrol === "Центральный") arr = [...arr, item];
    });
    return arr;
  }
  @computed get tableOneSouth() {
    let arr = [];
    this.rootStore.CrimeStore.updatedCrimes.forEach(item => {
      if (item.patrol === "Южный") arr = [...arr, item];
    });
    return arr;
  }
}
