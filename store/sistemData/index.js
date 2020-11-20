import { action, observable, computed } from "mobx"
import fetch from "isomorphic-unfetch"

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @observable sistemData = {
        city: "",
        patrols: [],
        serviceList: [],
        crimesList : []
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
    @action async changeSistemData() {
        const response = await fetch("/api/sistem_data/change", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.rootStore.token}`,
                Accept: "application/json",
            },
        })
        if(response.status === 200) {
            const responseData = await response.json()
            this.sistemData = responseData
        } else {
            this.rootStore.serverMistakes(response.status)
        }
    }
}