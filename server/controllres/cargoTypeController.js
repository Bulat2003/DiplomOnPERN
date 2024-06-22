const {CargoType, Driver} = require('../models/models')
const  ApiError = require('../error/ApiError')
class cargoTypeController{
    async create(req, res) {
        try {
            const { Type } = req.body; // Получаем значение поля Type из запроса
            const cargoType = await CargoType.create({ Type }); // Создаем новую запись в таблице CargoType
            return res.status(201).json(cargoType); // Возвращаем созданную запись в качестве ответа
        } catch (error) {
            console.error("Ошибка при создании типа груза:", error);
            return res.status(500).json({ error: "Ошибка при создании типа груза" });
        }
    }

    async getAll(req, res) {
        try {
            const cargoTypes = await CargoType.findAll(); // Получаем все записи из таблицы CargoType
            return res.json(cargoTypes); // Возвращаем записи в качестве ответа
        } catch (error) {
            console.error("Ошибка при получении типов груза:", error);
            return res.status(500).json({ error: "Ошибка при получении типов груза" });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params; // Получаем идентификатор типа груза из параметров запроса
            const deletedCount = await CargoType.destroy({ where: { id } }); // Удаляем тип груза по его идентификатору
            if (deletedCount === 0) {
                return res.status(404).json({ error: "Тип груза не найден" });
            }
            return res.json({ message: "Тип груза успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении типа груза:", error);
            return res.status(500).json({ error: "Ошибка при удалении типа груза" });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params; // Получаем идентификатор типа груза из параметров запроса
            const cargoType = await CargoType.findByPk(id); // Находим тип груза по его идентификатору
            if (!cargoType) {
                return res.status(404).json({ error: "Тип груза не найден" });
            }
            return res.json(cargoType); // Возвращаем найденный тип груза в качестве ответа
        } catch (error) {
            console.error("Ошибка при получении типа груза:", error);
            return res.status(500).json({ error: "Ошибка при получении типа груза" });
        }
    }

    async change(req, res) {
        try {
            const { id } = req.params; // Получаем идентификатор типа груза из параметров запроса
            const { Type } = req.body; // Получаем новое значение поля Type из тела запроса
            const [updatedCount, updatedCargoType] = await CargoType.update(
                { Type }, // Обновляем значение поля Type
                { where: { id }, returning: true }
            );
            if (updatedCount === 0) {
                return res.status(404).json({ error: "Тип груза не найден" });
            }
            return res.json(updatedCargoType[0]); // Возвращаем обновленный объект типа груза в качестве ответа
        } catch (error) {
            console.error("Ошибка при обновлении типа груза:", error);
            return res.status(500).json({ error: "Ошибка при обновлении типа груза" });
        }
    }
}

module.exports = new cargoTypeController()