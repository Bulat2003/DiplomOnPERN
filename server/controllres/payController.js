const {Pay} = require("../models/models");

class PayController{
    async create(req,res){
        const {Sum, Date, PayStatusId} = req.body;
        const pay = await Pay.create({Sum, Date, PayStatusId})
        return res.json(pay)
    }

    async getAll(req, res){
        try {
            const pays = await Pay.findAll(); // Получаем все платежи из базы данных
            return res.json(pays); // Отправляем список платежей в формате JSON
        } catch (error) {
            console.error("Ошибка при получении всех платежей:", error);
            return res.status(500).json({ error: "Ошибка при получении всех платежей" });
        }
    }
    async delete(req, res){
        try {
            const { id } = req.params; // Получаем идентификатор платежа, который нужно удалить, из параметров запроса
            const deletedCount = await Pay.destroy({ where: { id } }); // Удаляем платеж из базы данных по его идентификатору
            if (deletedCount === 0) { // Проверяем, был ли удален какой-либо платеж
                return res.status(404).json({ error: "Платеж не найден" });
            }
            return res.json({ message: "Платеж успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении платежа:", error);
            return res.status(500).json({ error: "Ошибка при удалении платежа" });
        }
    }
    async getOne(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор платежа из параметров запроса
            const pay = await Pay.findByPk(id); // Находим платеж по его идентификатору
            if (!pay) { // Проверяем, найден ли платеж
                return res.status(404).json({ error: "Платеж не найден" });
            }
            return res.json(pay); // Отправляем информацию о платеже в формате JSON
        } catch (error) {
            console.error("Ошибка при получении информации о платеже:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о платеже" });
        }
    }
    async change(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор платежа из параметров запроса
            const { Sum, Date, PayStatusId } = req.body; // Получаем новые данные о платеже из тела запроса
            const [updatedCount, updatedPay] = await Pay.update(
                { Sum, Date, PayStatusId },
                { where: { id }, returning: true }
            ); // Обновляем данные о платеже в базе данных
            if (updatedCount === 0) { // Проверяем, был ли обновлен какой-либо платеж
                return res.status(404).json({ error: "Платеж не найден" });
            }
            return res.json(updatedPay[0]); // Отправляем обновленные данные о платеже в формате JSON
        } catch (error) {
            console.error("Ошибка при обновлении информации о платеже:", error);
            return res.status(500).json({ error: "Ошибка при обновлении информации о платеже" });
        }
    }
}

module.exports = new PayController()