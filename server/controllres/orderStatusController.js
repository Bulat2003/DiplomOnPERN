const { OrderStatus } = require('../models/models');

class OrderStatusController {
    async create(req, res) {
        const { Status } = req.body;
        const orderStatus = await OrderStatus.create({ Status });
        return res.json(orderStatus);
    }

    async getAll(req, res) {
        try {
            const orderStatuses = await OrderStatus.findAll(); // Получаем все статусы заказов из базы данных
            return res.json(orderStatuses); // Отправляем список статусов заказов в формате JSON
        } catch (error) {
            console.error("Ошибка при получении всех статусов заказов:", error);
            return res.status(500).json({ error: "Ошибка при получении всех статусов заказов" });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params; // Получаем идентификатор статуса заказа, который нужно удалить, из параметров запроса
            const deletedCount = await OrderStatus.destroy({ where: { id } }); // Удаляем статус заказа из базы данных по его идентификатору
            if (deletedCount === 0) { // Проверяем, был ли удален какой-либо статус заказа
                return res.status(404).json({ error: "Статус заказа не найден" });
            }
            return res.json({ message: "Статус заказа успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении статуса заказа:", error);
            return res.status(500).json({ error: "Ошибка при удалении статуса заказа" });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params; // Получаем идентификатор статуса заказа из параметров запроса
            const orderStatus = await OrderStatus.findByPk(id); // Находим статус заказа по его идентификатору
            if (!orderStatus) { // Проверяем, найден ли статус заказа
                return res.status(404).json({ error: "Статус заказа не найден" });
            }
            return res.json(orderStatus); // Отправляем информацию о статусе заказа в формате JSON
        } catch (error) {
            console.error("Ошибка при получении информации о статусе заказа:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о статусе заказа" });
        }
    }

    async change(req, res) {
        try {
            const { id } = req.params; // Получаем идентификатор статуса заказа из параметров запроса
            const { Status } = req.body; // Получаем новый статус заказа из тела запроса
            const [updatedCount, updatedOrderStatus] = await OrderStatus.update(
                { Status },
                { where: { id }, returning: true }
            ); // Обновляем данные о статусе заказа в базе данных
            if (updatedCount === 0) { // Проверяем, был ли обновлен какой-либо статус заказа
                return res.status(404).json({ error: "Статус заказа не найден" });
            }
            return res.json(updatedOrderStatus[0]); // Отправляем обновленные данные о статусе заказа в формате JSON
        } catch (error) {
            console.error("Ошибка при обновлении информации о статусе заказа:", error);
            return res.status(500).json({ error: "Ошибка при обновлении информации о статусе заказа" });
        }
    }
}

module.exports = new OrderStatusController();
