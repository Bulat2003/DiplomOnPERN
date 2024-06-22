import {
    ABOUT_ROUTE,
    AUTH_ROUTE, CLIENTS_ROUTE,
    CONTACTS_ROUTE,
    DRIVER_ROUTE, DRIVERS_ROUTE,
    MAIN_ROUTE,
    MANAGER_ROUTE,
    REGISTRATION_ROUTE,
    USER_ROUTE,
    ONEDRIVER,
    ONECLIENT,
    DRIVERS_DATA,
    CLIENTS_DATA,
    ADD_CAR_ROUTE,
    RECOVERY,
    MONEY_ROUTE,
    CLIENTS_ORDER,
    DRIVER_ORDERS
} from "./utils/consts";
import clientsorder from "./pages/clientsOrder"
import manager from "./pages/manager";
import user from "./pages/user";
import driver from "./pages/driver";
import auth from "./pages/auth";
import contacts from "./pages/contacts";
import mainPage from "./pages/mainPage";
import registration from "./pages/registration";
import about from "./pages/about";
import drivers from'./pages/allDrivers'
import clients from'./pages/allClients'
import onedriver from './pages/oneDriver'
import oneclient from './pages/oneClient'
import driversdata from'./pages/driversdata'
import clientsdata from'./pages/clientsdata'
import addcar from './pages/addCar'
import moneyeject from './pages/moneyEject'
import recovery from './pages/recoveryPassword'
import driversorder from './pages/driverOrders'
import { Component } from "react";

export const authRoutes =[
    {
        path: MANAGER_ROUTE,
        Component: manager
    },
    {
        path: DRIVER_ORDERS,
        Component: driversorder
    },
    {
        path: DRIVERS_DATA,
        Component: driversdata  
    },
    {
        path: CLIENTS_DATA,
        Component: clientsdata  
    },
    {
        path: USER_ROUTE,
        Component: user
    },
    {
        path: DRIVER_ROUTE,
        Component: driver
    },
    {
        path: DRIVERS_ROUTE,
        Component: drivers
    },
    {
        path: CLIENTS_ROUTE,
        Component:clients
    },
    {
        path: ONECLIENT,
        Component: oneclient
    },
    {
        path: ONEDRIVER,
        Component: onedriver
    },
    {
        path: ADD_CAR_ROUTE,
        Component: addcar
    },
    {
        path: MONEY_ROUTE,
        Component: moneyeject
    },
    {
        path: CLIENTS_ORDER,
        Component: clientsorder
    }
]

export const publicRoutes =[
    {
        path: AUTH_ROUTE,
        Component: auth
    },
    {
        path: CONTACTS_ROUTE,
        Component: contacts
    },
    
    {
        path: MAIN_ROUTE,
        Component: mainPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: registration
    },
    {
        path: RECOVERY,
        Component: recovery
    },
    
    {
        path: ABOUT_ROUTE,
        Component: about
    }
]