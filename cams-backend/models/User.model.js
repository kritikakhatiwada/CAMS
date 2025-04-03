const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection.config");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
 firstName: {
    type: DataTypes.STRING,
  }, 
  lastName: {
    type: DataTypes.STRING,
  }, 
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
