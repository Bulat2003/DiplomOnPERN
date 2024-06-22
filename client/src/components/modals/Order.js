import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { createOrder } from "../../http/driversAPI";
import { Context } from '../../index';
import succesful from '../../assets/succesful.jpg';
import errorImg from '../../assets/Error.jpg';
import { observer } from "mobx-react-lite";

const Order = observer(({ show, onHide, selectedDriverId }) => {
    const { user } = useContext(Context);
    const [orderDetails, setOrderDetails] = useState({
        firstPoint: '',
        lastPoint: '',
        description: '',
        clientId: '',
        driverId: selectedDriverId,
    });
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [cardError, setCardError] = useState('');

    useEffect(() => {
        setOrderDetails(prevDetails => ({ ...prevDetails, driverId: selectedDriverId }));
    }, [selectedDriverId]);

    const handleChange = (field) => (e) => {
        setOrderDetails(prevDetails => ({ ...prevDetails, [field]: e.target.value }));
    };

    const handleCardChange = (field) => (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        setCardDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    };

    const validateCardDetails = () => {
        const { cardNumber, expiryDate, cvv } = cardDetails;
        if (!cardNumber || cardNumber.length !== 16) return false;
        if (!expiryDate || expiryDate.length !== 4) return false;
        if (!cvv || cvv.length !== 3) return false;
        return true;
    };

    const addOrder = async () => {
        const { firstPoint, lastPoint, description } = orderDetails;

        if (!firstPoint || !lastPoint || !description) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            setShowPaymentModal(true); // Show payment modal first
        } catch (error) {
            setError('Произошла ошибка при создании заказа.');
            console.error("Ошибка создания заказа:", error);
            setShowErrorModal(true);
        }
    };

    const handlePayment = async () => {
        if (!validateCardDetails()) {
            setCardError('Пожалуйста, заполните все поля правильно.');
            return;
        }

        try {
            const { firstPoint, lastPoint, description } = orderDetails;
            await createOrder(description, firstPoint, lastPoint, user.userId, selectedDriverId);
            setShowPaymentModal(false);
            setShowSuccessModal(true);
            onHide();
        } catch (error) {
            setCardError('Произошла ошибка при оплате.');
            console.error("Ошибка оплаты:", error);
            setShowErrorModal(true);
        }
    };

    const closeSuccessModal = () => setShowSuccessModal(false);
    const closeErrorModal = () => setShowErrorModal(false);

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Оформление заказа
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="p-3">
                            <h4>Введите начальную точку</h4>
                            <Form.Control
                                value={orderDetails.firstPoint}
                                onChange={handleChange('firstPoint')}
                                placeholder="г.Москва"
                            />
                        </div>
                        <div className="p-3">
                            <h4>Введите конечную точку</h4>
                            <Form.Control
                                value={orderDetails.lastPoint}
                                onChange={handleChange('lastPoint')}
                                placeholder="г.Казань"
                            />
                        </div>
                        <div className="p-3">
                            <h4>Введите описание</h4>
                            <Form.Control
                                value={orderDetails.description}
                                onChange={handleChange('description')}
                                placeholder="Например: 'Аккуратнее при перевозке'"
                            />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={addOrder}>Отправить заказ</Button>
                    <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Оплата заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Номер карты</Form.Label>
                            <Form.Control
                                type="text"
                                value={cardDetails.cardNumber}
                                onChange={handleCardChange('cardNumber')}
                                maxLength="16"
                                placeholder="1234 5678 9012 3456"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Месяц и год</Form.Label>
                            <Form.Control
                                type="text"
                                value={cardDetails.expiryDate}
                                onChange={handleCardChange('expiryDate')}
                                maxLength="4"
                                placeholder="MM/YY"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CVV код</Form.Label>
                            <Form.Control
                                type="text"
                                value={cardDetails.cvv}
                                onChange={handleCardChange('cvv')}
                                maxLength="3"
                                placeholder="123"
                            />
                        </Form.Group>
                        {cardError && <p className="text-danger">{cardError}</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handlePayment}>Оплатить</Button>
                    <Button variant="outline-danger" onClick={() => setShowPaymentModal(false)}>Закрыть</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={closeSuccessModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Успех</Modal.Title>
                </Modal.Header>
                <Modal.Body className='no-order-div'>
                    <img src={succesful} alt='succesful' width="300px" height="300px"></img>
                    <h4>Заказ успешно добавлен.</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeSuccessModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErrorModal} onHide={closeErrorModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка</Modal.Title>
                </Modal.Header>
                <Modal.Body className='no-order-div'>
                    <img src={errorImg} alt='error' width="300px" height="300px"></img>
                    <p>Произошла ошибка при создании заказа.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={closeErrorModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default Order;
