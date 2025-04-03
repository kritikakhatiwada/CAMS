const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection.config');
const User = require('./User.model');
const Application = require('./application.model');

const Payment = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Application,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    pidx: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    transaction_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fee: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    refunded: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Payment.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = Payment;