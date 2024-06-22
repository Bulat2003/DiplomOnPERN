const sequelize = require('../db')

const {DataTypes} = require('sequelize')

//Создание таблиц для БД



const Cargo = sequelize.define('Cargo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Description: { type: DataTypes.STRING(100), allowNull: false },
    Weight: { type: DataTypes.INTEGER, allowNull: false }
});

const CargoType = sequelize.define('CargoType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Type: { type: DataTypes.STRING(50), allowNull: false }
});

const Client = sequelize.define('Client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    LastName: { type: DataTypes.STRING(100), allowNull: false },
    FirstName: { type: DataTypes.STRING(50), allowNull: false },
    Patronymic: { type: DataTypes.STRING(50), allowNull: false },
    Email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    Password: { type: DataTypes.STRING(100), allowNull: false },
    Birthday: { type: DataTypes.DATE, allowNull: false },
    Phone: { type: DataTypes.STRING(11), allowNull: false }
});

const Driver = sequelize.define('Driver', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    LastName: { type: DataTypes.STRING(100), allowNull: false },
    FirstName: { type: DataTypes.STRING(50), allowNull: false },
    Patronymic: { type: DataTypes.STRING(50), allowNull: false },
    Email: { type: DataTypes.STRING(50), allowNull: false },
    Password: { type: DataTypes.STRING(100), allowNull: false },
    Birthday: { type: DataTypes.DATE, allowNull: false },
    Phone: { type: DataTypes.STRING(11), allowNull: false }
});

const Car = sequelize.define('Car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Brand: { type: DataTypes.STRING(100), allowNull: false },
    Model: { type: DataTypes.STRING(100), allowNull: false },
    Payload: { type: DataTypes.INTEGER, allowNull: false },
    BodyType: { type: DataTypes.STRING(100), allowNull: false }
});

const Manager = sequelize.define('Manager', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    LastName: { type: DataTypes.STRING(100), allowNull: false },
    FirstName: { type: DataTypes.STRING(50), allowNull: false },
    Patronymic: { type: DataTypes.STRING(50), allowNull: false },
    Email: { type: DataTypes.STRING(50), allowNull: false },
    Password: { type: DataTypes.STRING(50), allowNull: false },
    Birthday: { type: DataTypes.DATE, allowNull: false }
});

const Orders = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Comments: { type: DataTypes.STRING(100), allowNull: false },
    FirstPoint: { type: DataTypes.STRING(100), allowNull: false },
    LastPoint: { type: DataTypes.STRING(100), allowNull: false }/*,
    Date: { type: DataTypes.DATE, allowNull: false }*/
});

const OrderStatus = sequelize.define('OrderStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Status: { type: DataTypes.STRING(50), allowNull: false }
});

const Pay = sequelize.define('Pay', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Sum: { type: DataTypes.INTEGER, allowNull: false },
    Date: { type: DataTypes.DATE, allowNull: false }
});

const PayStatus = sequelize.define('PayStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Status: { type: DataTypes.STRING(50), allowNull: false }
});


// Связь для таблицы Car и Driver (один-ко-многим)
Car.belongsTo(Driver)
Driver.hasOne(Car)

// Связь для таблицы CargoType и Cargo (многие-ко-одному)
Cargo.belongsTo(CargoType);
CargoType.hasMany(Cargo);


// Связь для таблицы Client и Order (один-ко-многим)
Client.hasMany(Orders);
Orders.belongsTo(Client);

// Связь для таблицы Manager и Order (один-ко-многим)
Manager.hasMany(Orders);
Orders.belongsTo(Manager);

// Связь для таблицы Driver и Order (один-ко-многим)
Driver.hasMany(Orders);
Orders.belongsTo(Driver);

// Связь для таблицы OrderStatus и Order (один-ко-многим)
OrderStatus.hasMany(Orders);
Orders.belongsTo(OrderStatus);


// Связь для таблицы Pay и Order (один-ко-многим)
Pay.hasMany(Orders);
Orders.belongsTo(Pay);

// Связь для таблицы PayStatus и Pay (один-ко-многим)
PayStatus.hasMany(Pay);
Pay.belongsTo(PayStatus);

// Связь для таблицы Cargo и Orders (один-ко-многим)
Cargo.hasMany(Orders)
Orders.belongsTo(Cargo)


module.exports = {
    Car, Cargo, CargoType, Client, Driver, Manager, Orders, OrderStatus, Pay, PayStatus
}