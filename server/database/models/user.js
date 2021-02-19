const Sequelize = require('sequelize');
const db = require('../database');
const Team = require('./team');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    teamId: {
        type: Sequelize.INTEGER,
    }
});

module.exports = User;
