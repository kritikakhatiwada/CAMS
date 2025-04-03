const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection.config");
const College = require("./college.model");

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: College,
        key: "id",
      },
    },
    seatsAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requirement: {
      type: DataTypes.ENUM("+2","+2 Science", "+2 Management", "Bachelors", "SEE"),
      allowNull: false,
      validate: {
        isIn: [["+2","+2 Science", "+2 Management", "Bachelors", "SEE"]],
      },
    },
  reqGrade : {
    type: DataTypes.FLOAT(3,2),
    defaultValue: 0.00
  },
  fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  durationInYears: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scholarshipsAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  scholarshipDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  },
  {
    tableName: "courses",
    timestamps: true,
  }
);

// Set up association
College.hasMany(Course, { foreignKey: "collegeId", as: "courses" });
Course.belongsTo(College, { foreignKey: "collegeId", as: "college" });

module.exports = Course;
