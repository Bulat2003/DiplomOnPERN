import React, { useState } from 'react';
import { Container, Button, Form, Card, Alert } from "react-bootstrap";
import { AUTH_ROUTE } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Recovery = observer(() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Функция для отправки письма на почту
    const sendEmail = () => {
        // Проверка корректности введенной почты
        if (!isValidEmail(email)) {
            setErrorMessage('Некорректный email');
            return;
        }

        // Генерация четырехзначного кода
        const code = generateCode();

        // Отправка письма на указанный email
        // Здесь должен быть код для отправки письма с кодом на указанный email
        console.log(`Письмо с кодом ${code} отправлено на ${email}`);

        // Переход на страницу ввода кода
    };

    // Функция для проверки корректности email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Генерация четырехзначного кода
    const generateCode = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    return (
        <Container className="container-enter" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Восстановление пароля</h2>
                <Form className="d-flex flex-column">
                    <p className="none email-password p">Введите email</p>
                    <Form.Control
                        type="email" // Используем тип email для корректной валидации
                        className="input-class"
                        placeholder="for_example@mail.ru"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <div className="recovery-buttons">
                    <Button className="enter-button" onClick={sendEmail}>Отправить</Button>
                    <Button className="enter-button exit" onClick={() => navigate(AUTH_ROUTE)} variant={"outline-danger"}>Назад</Button>
                </div>
            </Card>
        </Container>
    );
});

export default Recovery;
