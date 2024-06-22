const {PayStatus, OrderStatus} = require("../models/models");

class payStatus{
    async create(req,res){
        const { Status } = req.body;
        const payStatus = await PayStatus.create({Status})
        return res.json(payStatus)
    }

    async getAll(req, res){
        try {
            const payStatus = await PayStatus.findAll(); // Получаем все статусы заказов из базы данных
            return res.json(payStatus); // Отправляем список статусов заказов в формате JSON
        } catch (error) {
            console.error("Ошибка при получении всех статусов заказов:", error);
            return res.status(500).json({ error: "Ошибка при получении всех статусов заказов" });
        }
    }
    async delete(req, res){
        try {
            const { id } = req.params; // Получаем идентификатор статуса заказа, который нужно удалить, из параметров запроса
            const deletedCount = await PayStatus.destroy({ where: { id } }); // Удаляем статус заказа из базы данных по его идентификатору
            if (deletedCount === 0) { // Проверяем, был ли удален какой-либо статус заказа
                return res.status(404).json({ error: "Статус заказа не найден" });
            }
            return res.json({ message: "Статус заказа успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении статуса заказа:", error);
            return res.status(500).json({ error: "Ошибка при удалении статуса заказа" });
        }
    }
    async getOne(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор статуса заказа из параметров запроса
            const payStatus = await PayStatus.findByPk(id); // Находим статус заказа по его идентификатору
            if (!payStatus) { // Проверяем, найден ли статус заказа
                return res.status(404).json({ error: "Статус заказа не найден" });
            }
            return res.json(payStatus); // Отправляем информацию о статусе заказа в формате JSON
        } catch (error) {
            console.error("Ошибка при получении информации о статусе заказа:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о статусе заказа" });
        }
    }
    async change(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор статуса заказа из параметров запроса
            const { Status } = req.body; // Получаем новый статус заказа из тела запроса
            const [updatedCount, updatedPayStatus] = await PayStatus.update(
                { Status },
                { where: { id }, returning: true }
            ); // Обновляем данные о статусе заказа в базе данных
            if (updatedCount === 0) { // Проверяем, был ли обновлен какой-либо статус заказа
                return res.status(404).json({ error: "Статус заказа не найден" });
            }
            return res.json(updatedPayStatus[0]); // Отправляем обновленные данные о статусе заказа в формате JSON
        } catch (error) {
            console.error("Ошибка при обновлении информации о статусе заказа:", error);
            return res.status(500).json({ error: "Ошибка при обновлении информации о статусе заказа" });
        }
    }
}

module.exports = new payStatus()