const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.User = User;

module.exports = db;
