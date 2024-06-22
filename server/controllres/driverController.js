const { Driver, Car } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

class DriverController {
    async create(req, res) {
        try {
            const { LastName, FirstName, Patronymic, Email, Password, Birthday, Phone } = req.body;
            const driver = await Driver.create({ LastName, FirstName, Patronymic, Email, Password, Birthday, Phone });
            return res.json(driver);
        } catch (error) {
            console.error("Ошибка при создании водителя:", error);
            return res.status(500).json({ error: "Ошибка при создании водителя" });
        }
    }

    async getAll(req, res) {
        try {
            const drivers = await Driver.findAll({
                include: [{
                    model: Car, as: 'Car' }]
            });
            return res.json(drivers);
        } catch (error) {
            console.error("Ошибка при получении списка водителей:", error);
            return res.status(500).json({ error: "Ошибка при получении списка водителей" });
        }
    }



    async getOne(req, res) {
        try {
            const { id } = req.params;
            const driver = await Driver.findByPk(id);
            if (!driver) {
                return res.status(404).json({ error: "Водитель не найден" });
            }
            return res.json(driver);
        } catch (error) {
            console.error("Ошибка при получении информации о водителе:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о водителе" });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await Driver.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ error: "Водитель не найден" });
            }
            return res.json({ message: "Водитель успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении водителя:", error);
            return res.status(500).json({ error: "Ошибка при удалении водителя" });
        }
    }

    async change(req, res, next) {
        const { id } = req.params;
        const {
            LastName, 
            FirstName, 
            Patronymic, 
            Email, 
            Password, 
            Birthday, 
            Phone
        } = req.body;
    
        try {
            const driver = await Driver.findByPk(id);
            if (!driver) {
                return next(ApiError.notFound("Водитель не найден"));
            }
    
            // Проверка на уникальность email и телефона
            if (Email && Email !== driver.Email && (await Driver.findOne({ where: { Email } }))) {
                return next(ApiError.BadRequest("Пользователь с такой почтой уже существует в системе!"));
            }
            if (Phone && Phone !== driver.Phone && (await Driver.findOne({ where: { Phone } }))) {
                return next(ApiError.BadRequest("Пользователь с таким телефоном уже существует в системе!"));
            }
    
            // Обновление данных водителя
            await driver.update({
                LastName: LastName || driver.LastName,
                FirstName: FirstName || driver.FirstName,
                Patronymic: Patronymic || driver.Patronymic,
                Email: Email || driver.Email,
                Password: Password || driver.Password, // Сохраняем пароль как есть
                Birthday: Birthday || driver.Birthday,
                Phone: Phone || driver.Phone
            });
    
            // Генерация JWT токена и его отправка в ответе
            const token = jwt.sign(
                { 
                    id: driver.id,
                    FirstName: driver.FirstName,
                    LastName: driver.LastName,
                    Patronymic: driver.Patronymic,
                    Email: driver.Email,
                    Password: driver.Password,
                    Birthday: driver.Birthday,
                    Phone: driver.Phone
                },
                process.env.SECRET_KEY, // Секретный ключ для подписи токена
                { expiresIn: '1h' } // Время жизни токена
            );
            return res.json({ token });
        } catch (error) {
            return next(ApiError.internal(`Во время работы сервера произошла следующая ошибка: ${error}`));
        }
    }
}

module.exports = new DriverController();
