import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DRIVER_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { addCar } from "../http/driversAPI"; // Импорт функции для добавления автомобиля
import "../styles/addCar.css";

const AddCar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [brand, setBrand] = useState(''); // Состояние для марки автомобиля
    const [model, setModel] = useState(''); // Состояние для модели автомобиля
    const [BodyType, setBody] = useState(''); // Состояние для типа кузова
    const [payload, setPayload] = useState(''); // Состояние для грузоподъемности автомобиля

    const handleAddCar = async () => {
        try {
            // Проверяем, что все поля заполнены
            if (!brand.trim() || !model.trim() || !payload.trim() || !BodyType.trim()) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            // Проверяем, что грузоподъемность является одним из допустимых значений
            const validPayloads = [3, 5, 10, 20];
            const payloadValue = parseInt(payload, 10);

            if (!validPayloads.includes(payloadValue)) {
                alert('Пожалуйста, введите одно из следующих значений для грузоподъемности: 3, 5, 10, 20');
                return;
            }

            // Вызываем функцию для добавления автомобиля
            const data = await addCar(brand, model, payloadValue, BodyType, user.userId);
            console.log(data)
            alert('Автомобиль успешно добавлен:', data);

            // Переходим на страницу водителя после успешного добавления автомобиля
            navigate(DRIVER_ROUTE);
        } catch (error) {
            console.error('Ошибка при добавлении автомобиля', error);
            // Здесь можно добавить обработку ошибок, например, отображение сообщения об ошибке пользователю
        }
    };

    const handleLogout = () => {
        user.setUserRole({});
        user.setIsAuth(false);
    };

    return (
        <Container className="addCar-container">
            <Card className="addCar-card">
                <h2 className="addCar-title">Добавить автомобиль</h2>
                <Form className="addCar-form">
                    <Row className="addCar-form-row">
                        <Col className="addCar-form-col">
                            <p className="addCar-label">Введите марку авто</p>
                            <Form.Control
                                className="addCar-input" placeholder="Volvo"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="addCar-form-row">
                        <Col className="addCar-form-col">
                            <p className="addCar-label">Введите модель</p>
                            <Form.Control
                                className="addCar-input" placeholder="FH"
                                value={model}
                                onChange={e => setModel(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="addCar-form-row">
                        <Col className="addCar-form-col">
                            <p className="addCar-label">Выберите тип кузова</p>
                            <Form.Select
                                className="addCar-input"
                                value={BodyType}
                                onChange={e => setBody(e.target.value)}
                            >
                                <option value="" disabled>Выберите тип кузова</option>
                                <option value="Бортовой">Бортовой</option>
                                <option value="Рефрежиратор">Рефрежиратор</option>
                                <option value="Тентованный">Тентованный</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="addCar-form-row">
                        <Col className="addCar-form-col">
                            <p className="addCar-label">Введите грузоподъемность (в тоннах)</p>
                            <Form.Control
                                className="addCar-input" placeholder="3"
                                value={payload}
                                onChange={e => setPayload(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
                <Button className="addCar-button" onClick={handleAddCar}>Сохранить</Button>
                <Link to={DRIVER_ROUTE}><Button  variant={'outline-danger'} onClick={handleLogout}>Выйти</Button></Link>
            </Card>
        </Container>
    );
});

export default AddCar;
