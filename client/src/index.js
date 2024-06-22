import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import userStore from "./store/userStore";
import driverStore from "../src/store/driverStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new userStore(),
        drivers: new driverStore(),
        clients: new driverStore(),
        cars: new driverStore()
    }}>
        <App/>
    </Context.Provider>
);
reportWebVitals();
