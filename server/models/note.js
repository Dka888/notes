import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  notification:{
    type: DataTypes.DATE,
  },
  completed : {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  forDelete: {
    type: DataTypes.BOOLEAN
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'white',
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

// Note.sync({ alter: true });
// 