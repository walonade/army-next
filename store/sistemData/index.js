import { action, observable } from "mobx"
import fetch from "isomorphic-unfetch"

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.changeSistemData = this.changeSistemData.bind(this)
    }
    @observable sistemData = {
        city: "",
        patrols: [],
        serviceList: [],
        crimesList : [],
        bounds: {}
    }
    @action async getSistemData() {
        const response = await fetch("/api/sistem_data/get", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.rootStore.token}`,
                Accept: "application/json",
            },
        })
        if(response.status === 200 || response.status === 304) {
            this.sistemData = await response.json()
        } else {
            this.rootStore.serverMistakes(response.status)
        }
    }
    @action async changeSistemData(data) {
        this.rootStore.setFetching(true)
        const response = await fetch("/api/sistem_data/change", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.rootStore.token}`,
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if(response.status === 201) {
            this.sistemData = await response.json()
            this.rootStore.setFetching(false)
            this.rootStore.NotificationStore.add("выполнено успешно", "success")
        } else {
            this.rootStore.setFetching(false)
            this.rootStore.serverMistakes(response.status)
        }
    }
}