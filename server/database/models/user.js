const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    team: {
        type: Sequelize.STRING,
    },
});

module.exports = User;
