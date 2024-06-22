import React, { useEffect, useState } from 'react';
import { Button, Container } from "react-bootstrap";
import { DRIVERS_ROUTE } from "../utils/consts";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneDriver } from "../http/driversAPI";

const OneDriver = () => {
    const [driver, setDriver] = useState(null); // Используем состояние для хранения данных о водителе
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneDriver(id).then(data => setDriver(data));
    }, [id]); // Включаем id в массив зависимостей для повторного запроса данных при изменении id

    // Функция для форматирования даты рождения в виде "ДД-ММ-ГГГГ"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <Container>
            <div className="d-grid justify-content-center align-items-center">
                {driver && ( // Проверяем наличие данных о водителе
                    <>
                        <h2 className="container-enter">{driver.FirstName}</h2>
                        <p>Фамилия: {driver.LastName}</p>
                        <p>Имя: {driver.FirstName}</p>
                        <p>Отчество: {driver.Patronymic}</p>
                        <p>Телефон: {driver.Phone}</p>
                        <p>email: {driver.Email}</p>
                        {/* Форматируем дату рождения */}
                        <p>Дата рождения: {formatDate(driver.Birthday)}</p>
                        <Button variant="outline-dark" onClick={() => navigate(DRIVERS_ROUTE)}>Назад</Button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default OneDriver;
