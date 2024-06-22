const {Manager} = require("../models/models");

class managerController{
    async create(req,res){
        const {LastName, FirstName, Patronymic, Email, Password, Birthday} = req.body;
        const manager = await Manager.create({LastName, FirstName, Patronymic, Email, Password, Birthday})
        return res.json(manager)
    }

    async getAll(req, res){
        try {
            const managers = await Manager.findAll(); // Получаем всех менеджеров из базы данных
            return res.json(managers); // Отправляем список менеджеров в формате JSON
        } catch (error) {
            console.error("Ошибка при получении всех менеджеров:", error);
            return res.status(500).json({ error: "Ошибка при получении всех менеджеров" });
        }
    }
    async delete(req, res){
        try {
            const { id } = req.params; // Получаем идентификатор менеджера, которого нужно удалить, из параметров запроса
            const deletedCount = await Manager.destroy({ where: { id } }); // Удаляем менеджера из базы данных по его идентификатору
            if (deletedCount === 0) { // Проверяем, был ли удален какой-либо менеджер
                return res.status(404).json({ error: "Менеджер не найден" });
            }
            return res.json({ message: "Менеджер успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении менеджера:", error);
            return res.status(500).json({ error: "Ошибка при удалении менеджера" });
        }
    }
    async getOne(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор менеджера из параметров запроса
            const manager = await Manager.findByPk(id); // Находим менеджера по его идентификатору
            if (!manager) { // Проверяем, найден ли менеджер
                return res.status(404).json({ error: "Менеджер не найден" });
            }
            return res.json(manager); // Отправляем информацию о менеджере в формате JSON
        } catch (error) {
            console.error("Ошибка при получении информации о менеджере:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о менеджере" });
        }
    }
    async change(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор менеджера из параметров запроса
            const { LastName, FirstName, Patronymic, Email, Password, Birthday } = req.body; // Получаем новые данные о менеджере из тела запроса
            const [updatedCount, updatedManager] = await Manager.update(
                { LastName, FirstName, Patronymic, Email, Password, Birthday },
                { where: { id }, returning: true }
            ); // Обновляем данные о менеджере в базе данных
            if (updatedCount === 0) { // Проверяем, был ли обновлен какой-либо менеджер
                return res.status(404).json({ error: "Менеджер не найден" });
            }
            return res.json(updatedManager[0]); // Отправляем обновленные данные о менеджере в формате JSON
        } catch (error) {
            console.error("Ошибка при обновлении информации о менеджере:", error);
            return res.status(500).json({ error: "Ошибка при обновлении информации о менеджере" });
        }
    }
}

module.exports = new managerController()