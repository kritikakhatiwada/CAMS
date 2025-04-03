const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection.config");
const College = require("./college.model");
const User = require("./User.model");

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    collegeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "colleges", // Use table name here
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Use table name here
        key: "id",
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "ratings", // Ensure the table name is set correctly
    timestamps: true,
  }
);

// Define Associations after models are defined
const defineAssociations = () => {
  // Import models inside the function to avoid circular dependency issues
  const College = require("./college.model"); 
  const User = require("./User.model");

  // Associations
  College.hasMany(Rating, { foreignKey: "collegeId", as: "ratings" });
  Rating.belongsTo(College, { foreignKey: "collegeId", as: "college" });

  User.hasMany(Rating, { foreignKey: "userId", as: "userRatings" });
  Rating.belongsTo(User, { foreignKey: "userId", as: "user" });
};

// Initialize associations
defineAssociations();

module.exports = Rating;
