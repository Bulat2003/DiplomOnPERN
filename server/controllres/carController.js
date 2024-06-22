const {Car} = require("../models/models");

class CarController{
    async create(req,res){
        const { Brand, Model,BodyType,Payload, DriverId } = req.body;
        const car = await Car.create({Brand, Model,BodyType, Payload, DriverId})
        return res.json({car})
    }

    async getAll(req, res){
        try {
            const cars = await Car.findAll(); // Получаем все записи из таблицы Car
            return res.json(cars); // Возвращаем записи в качестве ответа
        } catch (error) {
            console.error("Ошибка при получении списка автомобилей:", error);
            return res.status(500).json({ error: "Ошибка при получении списка автомобилей" });
        }
    }
    async delete(req, res){
        try {
            const { id } = req.params; // Получаем идентификатор автомобиля из параметров запроса
            const deletedCount = await Car.destroy({ where: { id } }); // Удаляем автомобиль по его идентификатору
            if (deletedCount === 0) {
                return res.status(404).json({ error: "Автомобиль не найден" });
            }
            return res.json({ message: "Автомобиль успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении автомобиля:", error);
            return res.status(500).json({ error: "Ошибка при удалении автомобиля" });
        }
    }
    async getOne(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор автомобиля из параметров запроса
            const car = await Car.findByPk(id); // Находим автомобиль по его идентификатору
            if (!car) {
                return res.status(404).json({ error: "Автомобиль не найден" });
            }
            return res.json(car); // Возвращаем найденный автомобиль в качестве ответа
        } catch (error) {
            console.error("Ошибка при получении информации об автомобиле:", error);
            return res.status(500).json({ error: "Ошибка при получении информации об автомобиле" });
        }
    }
    async change(req,res){
        try {
            const { id } = req.params; // Получаем идентификатор автомобиля из параметров запроса
            const { Brand, Model, BodyType, Payload } = req.body; // Получаем новые данные об автомобиле из тела запроса
            const [updatedCount, updatedCar] = await Car.update(
                { Brand, Model, BodyType, Payload }, // Обновляем данные об автомобиле
                { where: { id }, returning: true }
            );
            if (updatedCount === 0) {
                return res.status(404).json({ error: "Автомобиль не найден" });
            }
            return res.json(updatedCar[0]); // Возвращаем обновленный объект автомобиля в качестве ответа
        } catch (error) {
            console.error("Ошибка при обновлении информации об автомобиле:", error);
            return res.status(500).json({ error: "Ошибка при обновлении информации об автомобиле" });
        }
    }
}

module.exports = new CarController()