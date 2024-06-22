// UserStore.js
import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._userRole = null 
        this._userId = null
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUserRole(role) {
        this._userRole = role;
    }
    setUserId(id) {
        this._userId = id;
    }

    get isAuth() {
        return this._isAuth;
    }

    get userRole() {
        return this._userRole;
    }
    get userId() {
        return this._userId;
    }
}
