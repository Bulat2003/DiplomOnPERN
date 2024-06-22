import { makeAutoObservable } from "mobx";

export default class driverStore {
    constructor() {
        this._drivers = [];
        this._cars = [];
        this._clients = [

        ];

        makeAutoObservable(this);
    }

    setDrivers(drivers) {
        this._drivers = drivers;
    }

    setCars(cars) {
        this._cars = cars;
    }

    setClients(clients) {
        this._clients = clients;
    }

    get Drivers() {
        return this._drivers;
    }

    get Cars() {
        return this._cars;
    }

    get Clients() {
        return this._clients;
    }
}
