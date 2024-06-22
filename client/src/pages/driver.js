import React,{ useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ADD_CAR_ROUTE, AUTH_ROUTE, DRIVERS_DATA, MONEY_ROUTE, DRIVER_ORDERS } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import "../styles/driver.css"
//<button className="for-delete" onClick={() => navigate(MONEY_ROUTE)}>Вывод средств</button>

const Driver = observer(() => {
    const { user, drivers } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUserRole(null);
        user.setIsAuth(false);
    }

    return (
        <div className="main-container">
                <div className="driver-label">
                    <p>Личный кабинет</p>
                </div>
                <div className="driver-input">
                    <button className="for-delete" onClick={() => navigate(DRIVERS_DATA)}>Изменить данные</button>
                    <button className="for-delete" onClick={() => navigate(DRIVER_ORDERS)}>Заказы</button>
                    <Link to={`${ADD_CAR_ROUTE}/`}><button className="for-delete">Добавить машину</button></Link>
                </div>
                <div className="leave-driver">
                    <button onClick={() => logOut(navigate(AUTH_ROUTE))} className="leave-button button">Выйти из аккаунта</button>
                </div>
        </div>
    );
});

export default Driver;