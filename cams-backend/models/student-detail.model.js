const sequelize = require("../config/db-connection.config");
const { DataTypes } = require("sequelize");
const User = require("./User.model");

const StudentDetails = sequelize.define("student-details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  },
  parentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentContact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parentEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(StudentDetails, { foreignKey: "userId", as: "student" });
StudentDetails.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = StudentDetails;
