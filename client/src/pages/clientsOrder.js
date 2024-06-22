import React, { useEffect, useState, useContext } from 'react';
import '../styles/clientOrder.css';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { USER_ROUTE } from "../utils/consts";
import { fetchOrdersByClientId, deleteOrder } from "../http/ordersAPI";
import { Context } from "../index";
import noOrders from "../assets/noOrdrers.jpg";

const ClientsOrder = () => {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await fetchOrdersByClientId(user.userId);
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user.userId]);

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            setError(error.message);
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
                <h2 className="clientsOrder-title">Заказы</h2>
            </div>
            <div className="clientsOrder-list">
                {orders.length > 0 ? (
                    <div className="clientsOrder-grid">
                        {orders.map(order => (
                            <div className="clientsOrder-card" key={order.id}>
                                <div className="clientsOrder-item-header">
                                    <p className="clientsOrder-number">Заказ №{order.id}</p>
                                    <h3 className="clientsOrder-status">{order.OrderStatus.Status}</h3>
                                </div>
                                <div className="clientsOrder-details">
                                    <div className="clientsOrder-date">
                                        <h5 className="clientsOrder-label">Дата оформления:</h5>
                                        <p className="clientsOrder-text">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="clientsOrder-address">
                                        <h5 className="clientsOrder-label">Дата доставки:</h5>
                                        <p className="clientsOrder-text">{order.LastPoint}</p>
                                    </div>
                                </div>
                                <div className="cancel-btn">
                                    <button className="btn2" onClick={() => handleDelete(order.id)}>Отменить</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-orders-div">
                        <img src={noOrders} alt="no_orders" height="300px" width="300px" />
                        <p>На данный момент у вас нет заказов.</p>
                    </div>
                )}
            </div>
            <Link to={USER_ROUTE}>
                <Button className="exit" variant="outline-danger">Выйти</Button>
            </Link>
        </div>
    );
};

export default ClientsOrder;
