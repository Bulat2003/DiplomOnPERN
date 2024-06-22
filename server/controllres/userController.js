const ApiError = require('../error/ApiError');
const { Client, Driver, Manager } = require('../models/models');
const jwt = require('jsonwebtoken')

const generateJwt = (id, LastName, FirstName, Patronymic, Email, Birthday, Phone, role) => {
    const payload = {
        id, LastName, FirstName, Patronymic, Email, Birthday, Phone, role
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const { LastName, FirstName, Patronymic, Email, Password, Birthday, Phone, role } = req.body;

        if (!Email || !Password || !role) {
            return next(ApiError.BadRequest('Не заполнены обязательные поля: email, пароль или роль'));
        }

        try {
            const clientCandidate = await Client.findOne({ where: { Email } });
            const driverCandidate = await Driver.findOne({ where: { Email } });

            if (clientCandidate || driverCandidate) {
                return next(ApiError.BadRequest('Пользователь с таким email уже существует'));
            }

            let user;
            if (role === 'client') {
                user = await Client.create({ LastName, FirstName, Patronymic, Email, Birthday, Phone, Password });
            } else if (role === 'driver') {
                user = await Driver.create({ LastName, FirstName, Patronymic, Email, Birthday, Phone, Password });
            } else {
                return next(ApiError.BadRequest('Некорректная роль. Допустимые значения: client или driver'));
            }

            const token = generateJwt(user.id, LastName, FirstName, Patronymic, Email, Birthday, Phone, role)

            return res.json({ token}); // Отправляем данные пользователя и его роль

        } catch (error) {
            console.error("Error during user registration:", error);
            return next(ApiError.internal('Ошибка при регистрации пользователя'));
        }
    }

    async login(req, res, next) {
        const { Email, Password } = req.body;

        try {
            let user = await Client.findOne({ where: { Email } });

            if (!user) {
                user = await Driver.findOne({ where: { Email } });
            }

            if (!user) {
                user = await Manager.findOne({ where: { Email } });
            }

            if (!user) {
                return next(ApiError.BadRequest('Пользователь с таким email не найден'));
            }

            if (user.Password !== Password) {
                return next(ApiError.BadRequest('Неверный пароль'));
            }

            const role = user instanceof Client ? 'client' : user instanceof Driver ? 'driver' : 'manager';
            const token = generateJwt(user.id, user.LastName, user.FirstName, user.Patronymic, user.Email, user.Birthday, user.Phone, role)
            return res.json({ token }); // Отправляем данные пользователя и его роль

        } catch (error) {
            console.error("Ошибка при авторизации пользователя:", error);
            return next(ApiError.internal('Ошибка при попытке входа в систему'));
        }
    }
}

module.exports = new UserController();
