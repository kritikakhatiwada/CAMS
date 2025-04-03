const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-connection.config'); 
const User = require('./User.model')
const College = require('./college.model')
const Course = require('./courses.model');
const { Col } = require('sequelize/lib/utils');

const Applications = sequelize.define('applications', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
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
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'approved'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'applications',
  timestamps: true,
});

Applications.belongsTo(User, { foreignKey: 'student_id', as: 'student' });
Applications.belongsTo(College, { foreignKey: 'college_id', as: 'college' });

College.hasMany(Applications, { foreignKey: 'college_id', as: 'applications' });
User.hasMany(Applications, { foreignKey: 'student_id', as: 'applications' });

module.exports = Applications;
