const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, // In a real app, hash this!
        allowNull: false,
    }
});

module.exports = Admin;
