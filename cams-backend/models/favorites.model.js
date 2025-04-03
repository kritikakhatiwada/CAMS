const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection.config');
const Student = require('./student-detail.model');  // Import Student model
const College = require('./college.model');  // Import College model
const User = require('./User.model');

const Favorites = sequelize.define('favorites', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,  
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  college_id: {
    type: DataTypes.INTEGER,
    references: {
      model: College,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'favorites',
  timestamps: true,
});

Favorites.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Favorites.belongsTo(College, { foreignKey: 'college_id', as: 'college' });

Student.hasMany(Favorites, { foreignKey: 'student_id', as: 'favorites' });
College.hasMany(Favorites, { foreignKey: 'college_id', as: 'favorites' });

Student.belongsTo(User, { foreignKey: 'user_id', as: 'studentUser' });  

module.exports = Favorites;
