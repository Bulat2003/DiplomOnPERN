import React, { useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import OneDriver from "../pages/oneDriver";
import OneClient from "../pages/oneClient";
import AllClients from "../pages/allClients";
import AllDrivers from "../pages/allDrivers";
import ClientsOrder from "../pages/clientsOrder"; // Импортируем компонент ClientsOrder

const AppRouter = () => {
    const { user } = useContext(Context);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            <Route path="/" element={<AllDrivers />} exact />
            <Route path="/onedriver/:id" element={<OneDriver />} exact />
            <Route path="/allclients" element={<AllClients />} exact />
            <Route path="/oneclient/:id" element={<OneClient />} exact />
            <Route path="/orders/client/:clientId" element={<ClientsOrder />} exact /> {/* Добавляем маршрут для ClientsOrder */}
        </Routes>
    );
};

export default AppRouter;
