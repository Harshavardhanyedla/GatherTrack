const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Gathering = sequelize.define('Gathering', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
});

module.exports = Gathering;
