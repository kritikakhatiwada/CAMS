const sequelize = require("../config/db-connection.config");
const { DataTypes } = require("sequelize");
const StudentDetails = require("./student-detail.model");

const Education = sequelize.define("student-education", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  collegeName: {
    type: DataTypes.STRING,
  },
  startedYear: {
    type: DataTypes.DATE,
  },
  PassedYear: {
    type: DataTypes.DATE,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StudentDetails,
      key: "id",
    },
  },
  cgpa: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  degree: {
    type: DataTypes.ENUM,
    values: ["+2 Management", "+2 Science", "SEE", "Bachelors"],
    allowNull: false,
  }
});

StudentDetails.hasMany(Education, { foreignKey: "studentId", as: "education" });
Education.belongsTo(StudentDetails, { foreignKey: "studentId", as: "student" });

module.exports = Education;
