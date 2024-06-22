
// OneClient.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneClient } from '../http/driversAPI';
import { Button, Container } from 'react-bootstrap';
import { CLIENTS_ROUTE } from '../utils/consts';

const OneClient = () => {
    const [client, setClient] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneClient(id).then(data => setClient(data));
    }, [id]);

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
                {client && (
                    <>
                        <h2 className="container-enter">{client.FirstName}</h2>
                        <p>Фамилия: {client.LastName}</p>
                        <p>Имя: {client.FirstName}</p>
                        <p>Отчество: {client.Patronymic}</p>
                        <p>Телефон: {client.Phone}</p>
                        <p>email: {client.Email}</p>
                        <p>Дата рождения: {formatDate(client.Birthday)}</p>
                        <Button variant="outline-dark" onClick={() => navigate(CLIENTS_ROUTE)}>Назад</Button>
                    </>
                )}
            </div>
        </Container>
    );
    
};

export default OneClient;
