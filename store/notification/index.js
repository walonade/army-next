import { action, observable, computed } from "mobx";

export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable notifications = {};
  _ai = 0;

  @computed get list() {
    return Object.values(this.notifications);
  }
  @computed get optimazeRemove() {
    return this.list.map(node => () => this.remove(node.id))
  }
  @action remove(id) {
    if (id in this.notifications) {
      this.notifications[id].show = false
      delete this.notifications[id];
    }
  }
  @action add(message = "", type = "error") {
    this.notifications[++this._ai] = {
      id: this._ai,
      message,
      type,
      show: true
    };
  }
}
