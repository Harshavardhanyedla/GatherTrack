const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { v4: uuidv4 } = require('uuid');

const Person = sequelize.define('Person', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    qrCodeData: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

module.exports = Person;
