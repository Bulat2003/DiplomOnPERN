const {Client} = require('../models/models')
const  ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken');

class ClientsController{
    async create(req,res){
        const {LastName} = req.body
        const {FirstName} = req.body
        const {Patronymic} = req.body
        const {Email} = req.body
        const {Password} = req.body
        const {Birthday} = req.body
        const {Phone} = req.body
        const client = await Client.create({LastName, FirstName, Patronymic, Email, Password, Birthday, Phone})
        return res.json(client)
    }

    async getAll(req, res){
        try {
            const clients = await Client.findAll();
            return res.json(clients);
        } catch (error) {
            console.error("Ошибка при получении списка пользователей:", error);
            return res.status(500).json({ error: "Ошибка при получении списка пользователей" });
        }
    }

    async getOne(req, res){
        try {
            const { id } = req.params;
            const client = await Client.findByPk(id);
            if (!client) {
                return res.status(404).json({ error: "Клиент не найден" });
            }
            return res.json(client);
        } catch (error) {
            console.error("Ошибка при получении информации о клиенте:", error);
            return res.status(500).json({ error: "Ошибка при получении информации о клиенте" });
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const deletedCount = await Client.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ error: "Клиент не найден" });
            }
            return res.json({ message: "Клиент успешно удален" });
        } catch (error) {
            console.error("Ошибка при удалении клиента:", error);
            return res.status(500).json({ error: "Ошибка при удалении клиента" });
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
            const client = await Client.findByPk(id);
            if (!client) {
                return next(ApiError.notFound("Водитель не найден"));
            }
    
            // Проверка на уникальность email и телефона
            if (Email && Email !== client.Email && (await Client.findOne({ where: { Email } }))) {
                return next(ApiError.BadRequest("Пользователь с такой почтой уже существует в системе!"));
            }
            if (Phone && Phone !== client.Phone && (await Client.findOne({ where: { Phone } }))) {
                return next(ApiError.BadRequest("Пользователь с таким телефоном уже существует в системе!"));
            }
    
            // Обновление данных водителя
            await client.update({
                LastName: LastName || client.LastName,
                FirstName: FirstName || client.FirstName,
                Patronymic: Patronymic || client.Patronymic,
                Email: Email || client.Email,
                Password: Password || client.Password, // Сохраняем пароль как есть
                Birthday: Birthday || client.Birthday,
                Phone: Phone || client.Phone
            });
    
            // Генерация JWT токена и его отправка в ответе
            const token = jwt.sign(
                { 
                    id: client.id,
                    FirstName: client.FirstName,
                    LastName: client.LastName,
                    Patronymic: client.Patronymic,
                    Email: client.Email,
                    Password: client.Password,
                    Birthday: client.Birthday,
                    Phone: client.Phone
                },
                process.env.SECRET_KEY, // Секретный ключ для подписи токена
                { expiresIn: '24h' } // Время жизни токена
            );
            return res.json({ token });
        } catch (error) {
            return next(ApiError.internal(`Во время работы сервера произошла следующая ошибка: ${error}`));
        }
    }
}

module.exports = new ClientsController()