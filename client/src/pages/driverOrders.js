import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import '../styles/clientOrder.css';
import { Link } from "react-router-dom";
import { DRIVER_ROUTE } from "../utils/consts";
import { fetchOrdersByDriverId, updateOrderStatus, fetchAllOrderStatuses } from "../http/ordersAPI";
import { Context } from "../index";
import noOrders from "../assets/noOrdrers.jpg";

const DriverOrders = () => {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await fetchOrdersByDriverId(user.userId);
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchStatuses = async () => {
            try {
                const data = await fetchAllOrderStatuses();
                setStatuses(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchOrders();
        fetchStatuses();
    }, [user.userId]);

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
        setNewStatus("");
    };

    const handleStatusChange = async () => {
        if (selectedOrder && newStatus) {
            try {
                await updateOrderStatus(selectedOrder.id, newStatus);
                setOrders(orders.map(order => order.id === selectedOrder.id ? { ...order, OrderStatusId: newStatus } : order));
            } catch (error) {
                console.error("Ошибка при обновлении статуса заказа:", error);
            } finally {
                handleCloseModal();
            }
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="clientsOrder-container">
            <div className="clientsOrder-header">
                <h2 className="clientsOrder-title">Заказы водителя</h2>
            </div>
            <div className="clientsOrder-list">
                {orders.length > 0 ? orders.map(order => (
                    <div className="clientsOrder-card" key={order.id}>
                        <div className="clientsOrder-item-header">
                            <p className="clientsOrder-number">Заказ №{order.id}</p>
                        </div>
                        <div className="clientsOrder-details-driver">
                            <div className="clientsOrder-date">
                                <h5 className="clientsOrder-label">Дата оформления:</h5>
                                <p className="clientsOrder-text">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="clientsOrder-address-driver">
                                <h5 className="clientsOrder-label">Первый пункт:</h5>
                                <p className="clientsOrder-text">{order.FirstPoint}</p>
                            </div>
                            <div className="clientsOrder-address-driver">
                                <h5 className="clientsOrder-label">Второй пункт:</h5>
                                <p className="clientsOrder-text">{order.LastPoint}</p>
                            </div>
                        </div>
                        <Button className="status-change" variant="outline-dark" onClick={() => handleShowModal(order)}>Изменить статус</Button>
                    </div>
                )) : (
                    <div className="no-orders-div">
                        <img src={noOrders} alt="no_orders" height="300px" width="300px"/>
                        <p>На данный момент у вас нет заказов.</p>
                    </div>
                )}
            </div>
            <Link to={DRIVER_ROUTE}><Button className="exit" variant={'outline-danger'}>Выйти</Button></Link>
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменить статус заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Выберите новый статус</Form.Label>
                            <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                <option value="">Выберите статус</option>
                                {statuses.map(status => (
                                    <option key={status.id} value={status.id}>{status.Status}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleCloseModal}>Закрыть</Button>
                    <Link to={DRIVER_ROUTE}>
                    <Button variant="outline-success" onClick={handleStatusChange} disabled={!newStatus}>Сохранить</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DriverOrders;
