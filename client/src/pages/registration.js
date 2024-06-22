import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { AUTH_ROUTE } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import '../styles/reg.css';
import { registration } from "../http/userAPI";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Registration = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('client');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6 && !/\s/.test(password);
    };

    const validatePhone = (phone) => {
        return phone.replace(/\D/g, '').length === 11;
    };

    const validateNotEmpty = (value) => {
        return value.trim() !== '';
    };

    const validateName = (name) => {
        return /^[a-zA-Zа-яА-ЯёЁ]+$/.test(name);
    };

    const validateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            return age - 1 >= 18;
        }

        return age >= 18;
    };

    const handlePhoneChange = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 11) input = input.substring(0, 11);
        let formattedPhone = "+7 (";
        if (input.length > 1) formattedPhone += input.substring(1, 4);
        if (input.length > 4) formattedPhone += ") " + input.substring(4, 7);
        if (input.length > 7) formattedPhone += "-" + input.substring(7, 9);
        if (input.length > 9) formattedPhone += "-" + input.substring(9, 11);
        setPhone(formattedPhone);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setPassword(value);
    };

    const handleNameChange = (setter) => (e) => {
        const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
        setter(value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!validateEmail(email)) newErrors.email = "Неверный формат email";
        if (!validatePassword(password)) newErrors.password = "Пароль должен быть не менее 6 символов и без пробелов";
        if (!validatePhone(phone)) newErrors.phone = "Неверный формат номера телефона";
        if (!validateNotEmpty(lastName)) newErrors.lastName = "Введите фамилию";
        if (!validateNotEmpty(firstName)) newErrors.firstName = "Введите имя";
        if (!validateNotEmpty(birthday)) newErrors.birthday = "Введите дату рождения";
        else if (!validateAge(birthday)) newErrors.birthday = "Вам должно быть не менее 18 лет";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const reg = async () => {
        if (!validateForm()) return;

        try {
            const cleanedPhone = phone.replace(/\D/g, '');
            const data = await registration(lastName, firstName, patronymic, email, password, cleanedPhone, birthday, role);
            user.setIsAuth(true);
            user.setUserRole(data.role);
            user.setUserId(data.id);
            navigate(AUTH_ROUTE);
            console.log(data);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container className="registration-container">
            <Card className="registration-card">
                <h2 className="registration-title">Регистрация</h2>
                <Form className="registration-form">
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Выберите роль</p>
                            <Form.Select
                                className="registration-input"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            >
                                <option value="client">Клиент</option>
                                <option value="driver">Водитель</option>
                            </Form.Select>
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите фамилию</p>
                            <Form.Control
                                className="registration-input"
                                placeholder="Иванов"
                                value={lastName}
                                onChange={handleNameChange(setLastName)}
                                maxLength={50}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите имя</p>
                            <Form.Control
                                className="registration-input"
                                placeholder="Иван"
                                value={firstName}
                                onChange={handleNameChange(setFirstName)}
                                maxLength={50}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Col>
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
                    </Row>
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите email</p>
                            <Form.Control
                                className="registration-input"
                                placeholder="for_example@mail.ru"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                maxLength={50}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите номер телефона</p>
                            <Form.Control
                                className="registration-input"
                                placeholder="+7 (___) ___-__-__"
                                value={phone}
                                onChange={handlePhoneChange}
                                maxLength={50}
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="registration-form-row">
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите пароль</p>
                            <Form.Control
                                type="password"
                                className="registration-input"
                                placeholder="•••••••"
                                value={password}
                                onChange={handlePasswordChange}
                                maxLength={50}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Col>
                        <Col md={6} className="registration-form-col">
                            <p className="registration-label">Введите дату рождения</p>
                            <Form.Control
                                type="date"
                                className="registration-input"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                                maxLength={50}
                                isInvalid={!!errors.birthday}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.birthday}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form>
                <Button className="registration-button" onClick={reg}>Зарегистрироваться</Button>
                <div className="registration-route">
                    <p className="registration-text">Есть аккаунт?</p> <Link className="registration-link" to={AUTH_ROUTE}><p>Войти</p></Link>
                </div>
            </Card>
        </Container>
    );
});

export default Registration;
