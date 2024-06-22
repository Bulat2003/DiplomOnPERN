import {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, CLIENTS_ROUTE, DRIVERS_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import '../styles/manger.css'

const Manager = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate()
    const logOut = ()=>{
        user.setUserRole(null)
        user.setIsAuth(false)
    }
    return (
        <div className="main-container">
            <div className="manager-label">
                <p>Личный кабинет</p>
            </div>
            <div className="manager-input">
                <button className="for-delete" onClick={() => navigate(CLIENTS_ROUTE)}>Клиенты</button>
                <button className="for-delete" onClick={()=> navigate(DRIVERS_ROUTE)}>Водители</button>
            </div>
            <div className="leave">
                <button onClick={() => logOut(navigate(AUTH_ROUTE))} className="leave-button button">Выйти из аккаунта</button>
            </div>

        </div>
    );
});

export default Manager;