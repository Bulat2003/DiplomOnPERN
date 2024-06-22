import React, {useContext} from 'react';
import {AUTH_ROUTE, CLIENTS_DATA, CLIENTS_ORDER} from "../utils/consts";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const User = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const logOut = () => {
        user.setUserRole(null);
        user.setIsAuth(false);
        navigate(AUTH_ROUTE);
    };

    return (
        <div className="main-container">
            <div className="manager-label">
                <p>Личный кабинет</p>
            </div>
            <div className="manager-input">
                <button className="for-delete" onClick={() => navigate(CLIENTS_DATA)}>Изменить данные</button>
                <button className="for-delete" onClick={() => navigate(`/orders/client/${user.id}`)}>Заказы</button>
            </div>
            <div className="leave">
                <button onClick={() => logOut()} className="leave-button button">Выйти из аккаунта</button>
            </div>
        </div>
    );
};

export default User;