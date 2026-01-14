const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('RECEIVED', 'NOT_RECEIVED'),
        defaultValue: 'RECEIVED',
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});

module.exports = Transaction;
