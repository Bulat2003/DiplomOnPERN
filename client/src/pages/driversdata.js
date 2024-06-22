import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DRIVER_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { DriverDataChange } from "../http/driversAPI";
import "../styles/driver.css";
import { getProfileDriver } from "../http/userAPI";

const Driversdata = observer(() => {
    const { drivers, user } = useContext(Context);
    const navigate = useNavigate();

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileDriver(user.userId); // Ensure user.userId is the correct ID
                setLastName(data.LastName);
                setFirstName(data.FirstName);
                setPatronymic(data.Patronymic);
                setEmail(data.Email);
                setPassword(data.Password);
                setConfirmPassword(data.Password);
                setBirthday(formatDateToDDMMYYYY(data.Birthday));
                setPhone(formatPhone(data.Phone));
            } catch (error) {
                console.error('Ошибка при получении данных профиля', error);
            }
        };

        fetchProfile();
    }, [user.userId]);

    const formatDateToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const formatDateToYYYYMMDD = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    };

    const formatPhone = (phone) => {
        if (!phone) return '';
        const phoneDigits = phone.replace(/\D/g, '');
        let formattedPhone = '+7 (';
        if (phoneDigits.length > 1) formattedPhone += phoneDigits.substring(1, 4);
        if (phoneDigits.length >= 5) formattedPhone += `) ${phoneDigits.substring(4, 7)}`;
        if (phoneDigits.length >= 8) formattedPhone += `-${phoneDigits.substring(7, 11)}`;
        return formattedPhone;
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\+7\s\(\d{3}\)\s\d{3}-\d{4}$/.test(phone);

    const validateName = (name) => /^[a-zA-Zа-яА-ЯёЁ]+$/.test(name);

    const validateForm = () => {
        const newErrors = {};

        // Validate email
        if (!email) newErrors.email = "Email не может быть пустым";
        else if (!isValidEmail(email)) newErrors.email = "Неверный формат email";

        // Validate phone
        if (!phone) newErrors.phone = "Телефон не может быть пустым";
        else if (!isValidPhone(phone)) newErrors.phone = "Неверный формат номера телефона";

        // Validate passwords
        if (password.length === 0) newErrors.password = "Пароль не может быть пустым";
        else if (password.length < 6) newErrors.password = "Пароль должен быть не менее 6 символов";
        else if (/\s/.test(password)) newErrors.password = "Пароль не должен содержать пробелов";
        else if (password !== confirmPassword) newErrors.password = "Пароли не совпадают";

        // Validate names
        if (!lastName.trim()) newErrors.lastName = "Введите фамилию";
        else if (!validateName(lastName)) newErrors.lastName = "Фамилия не должна содержать цифры или специальные символы";

        if (!firstName.trim()) newErrors.firstName = "Введите имя";
        else if (!validateName(firstName)) newErrors.firstName = "Имя не должно содержать цифры или специальные символы";

        if (patronymic && !validateName(patronymic)) newErrors.patronymic = "Отчество не должно содержать цифры или специальные символы";

        // Validate birthday and age
        if (!birthday) newErrors.birthday = "Введите дату рождения";
        else {
            const birthDate = new Date(formatDateToYYYYMMDD(birthday));
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            const dayDifference = today.getDate() - birthDate.getDate();
            if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                if (age - 1 < 18) newErrors.birthday = "Вам должно быть не менее 18 лет";
            } else {
                if (age < 18) newErrors.birthday = "Вам должно быть не менее 18 лет";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNameChange = (setter) => (e) => {
        const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
        setter(value);
    };
    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        let formattedPhone = '+7 (';
        if (value.length > 1) formattedPhone += value.substring(1, 4);
        if (value.length >= 5) formattedPhone += `) ${value.substring(4, 7)}`;
        if (value.length >= 8) formattedPhone += `-${value.substring(7, 11)}`;
        setPhone(formattedPhone);
    };

    const ChangeData = async () => {
        if (!validateForm()) return;

        try {
            const sanitizedPhone = phone.replace(/\D/g, '');
            const formattedBirthday = formatDateToYYYYMMDD(birthday);
            const data = await DriverDataChange(lastName, firstName, patronymic, email, password, formattedBirthday, sanitizedPhone, user.userId);
            alert('Данные успешно изменены');
            navigate(DRIVER_ROUTE);
        } catch (error) {
            console.error('Ошибка при изменении данных', error);
        }
    };

    return (
        <Container className="registration-container">
            <Card className="registration-card">
                <h2 className="registration-title">Изменение данных</h2>
                <Form className="registration-form">
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите фамилию</p>
                            <Form.Control
                                className={`registration-input ${errors.lastName ? 'is-invalid' : ''}`}
                                placeholder="Иванов"
                                value={lastName}
                                onChange={handleNameChange(setLastName)}
                                maxLength={50}
                            />
                            {errors.lastName && <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>}
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите имя</p>
                            <Form.Control
                                className={`registration-input ${errors.firstName ? 'is-invalid' : ''}`}
                                placeholder="Иван"
                                value={firstName}
                                onChange={handleNameChange(setFirstName)}
                                maxLength={50}
                            />
                            {errors.firstName && <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите отчество</p>
                            <Form.Control
                                className="registration-input"
                                placeholder="Иванович"
                                value={patronymic}
                                onChange={handleNameChange(setPatronymic)}
                                maxLength={50}
                            />
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите дату рождения</p>
                            <Form.Control
                                type="text"
                                className={`registration-input ${errors.birthday ? 'is-invalid' : ''}`}
                                placeholder="дд.мм.гггг"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                            />
                            {errors.birthday && <Form.Control.Feedback type="invalid">{errors.birthday}</Form.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите email</p>
                            <Form.Control
                                className={`registration-input ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="for_example@mail.ru"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                maxLength={50}
                            />
                            {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите номер телефона</p>
                            <Form.Control
                                type="tel"
                                className={`registration-input ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder="+7 (___) ___-____"
                                value={phone}
                                onChange={handlePhoneChange}
                                maxLength={17}
                            />
                            {errors.phone && <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>}
                        </Col>
                    </Row>
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите пароль</p>
                            <Form.Control
                                type="password"
                                className={`registration-input ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="•••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                maxLength={50}
                            />
                            {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Повторите пароль</p>
                            <Form.Control
                                type="password"
                                className={`registration-input ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="•••••••"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                maxLength={50}
                            />
                            {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                        </Col>
                    </Row>
                </Form>
                <Button className="registration-button" onClick={ChangeData}>Сохранить</Button>
                <Link to={DRIVER_ROUTE}><Button className="exit" variant={'outline-danger'}>Выйти</Button></Link>
            </Card>
        </Container>
    );
});

export default Driversdata;
