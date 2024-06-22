const { Orders, OrderStatus } = require('../models/models');

class OrdersController{
    async create(req, res) {
        const {  FirstPoint, LastPoint, Comments, ClientId, DriverId, OrderStatusId} = req.body;
        try {
            const order = await Orders.create({ FirstPoint, LastPoint, Comments, ClientId, DriverId, OrderStatusId});
            return res.json(order);
        } catch (error) {
            console.error("Ошибка при создании заказа:", error);
            return res.status(500).json({ message: "Ошибка сервера при создании заказа" });
        }
    }

    async getAll(req, res) {
        try {
            const orders = await Orders.findAll();
            return res.json(orders);
        } catch (error) {
            console.error("Ошибка при получении всех заказов:", error);
            return res.status(500).json({ message: "Ошибка сервера при получении всех заказов" });
        }
    }
    async getByClientId(req, res) {
        const { clientId } = req.params;
        try {
            const orders = await Orders.findAll({
                where: { ClientId: clientId },
                include: [{ model: OrderStatus, attributes: ['Status'], as: 'OrderStatus' }]
            });
            return res.json(orders);
        } catch (error) {
            console.error("Ошибка при получении заказов клиента:", error);
            return res.status(500).json({ message: "Ошибка сервера при получении заказов клиента" });
        }
    }

    async getByDriverId(req, res) {
        const { driverId } = req.params;
        try {
            const orders = await Orders.findAll({
                where: { DriverId: driverId },
                include: [{ model: OrderStatus, attributes: ['Status'], as: 'OrderStatus' }]
            });
            return res.json(orders);
        } catch (error) {
            console.error("Ошибка при получении заказов клиента:", error);
            return res.status(500).json({ message: "Ошибка сервера при получении заказов клиента" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        try {
            const order = await Orders.findOne({ where: { id } });
            if (!order) {
                return res.status(404).json({ message: "Заказ не найден" });
            }
            return res.json(order);
        } catch (error) {
            console.error("Ошибка при получении заказа:", error);
            return res.status(500).json({ message: "Ошибка сервера при получении заказа" });
        }
    }

    async change(req, res) {
        const { id } = req.params;
        const { OrderStatusId } = req.body; // Изменен для изменения только статуса
        try {
            let order = await Orders.findOne({ where: { id } });
            if (!order) {
                return res.status(404).json({ message: "Заказ не найден" });
            }
            order = await order.update({ OrderStatusId });
            return res.json(order);
        } catch (error) {
            console.error("Ошибка при изменении заказа:", error);
            return res.status(500).json({ message: "Ошибка сервера при изменении заказа" });
        }
    }
    

    async delete(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Orders.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: "Заказ не найден" });
            }
            return res.json({ message: "Заказ успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении заказа:", error);
            return res.status(500).json({ message: "Ошибка сервера при удалении заказа" });
        }
    }
}

module.exports = new OrdersController()