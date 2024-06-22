import '../styles/Auth.css';
import { Container, Button, Form, Card } from "react-bootstrap";
import { DRIVER_ROUTE, MANAGER_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import faEye from '../assets/eye-regular.svg';
import faEyeSlash from '../assets/eye-slash-regular.svg';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Введите email";
        else if (!validateEmail(email)) newErrors.email = "Неверный формат email";

        if (!password) newErrors.password = "Введите пароль";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const auth = async () => {
        if (!validateForm()) return;

        try {
            const response = await login(email, password);
            user.setUserRole(response.role);
            user.setUserId(response.id);

            if (user.userRole === 'client') {
                navigate(USER_ROUTE);
            } else if (user.userRole === 'manager') {
                navigate(MANAGER_ROUTE);
            } else if (user.userRole === 'driver') {
                navigate(DRIVER_ROUTE);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container className="container-enter" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <p className="none email-password p">Введите email</p>
                    <Form.Control
                        type="text"
                        className={`input-class ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="for_example@mail.ru"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                    
                    <p className="none email-password p">Введите пароль</p>
                    <div className="password-container">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            className={`input-class ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="•••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <img
                            className="password-icon" 
                            src={showPassword ? faEyeSlash : faEye} 
                            alt="Toggle Password Visibility"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                    {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                </Form>
                <Button className="enter-button" onClick={auth}>Войти</Button>

                <div className="reg-route">
                    <p className="none p">Нет аккаунта?</p> <Link className="reg" to={REGISTRATION_ROUTE}><p>Зарегистрироваться</p></Link>
                </div>
            </Card>
        </Container>
    );
});

export default Auth;
