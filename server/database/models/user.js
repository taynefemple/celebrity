const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    team: {
        type: Sequelize.STRING,
    },
    // this should be moved to a Team model
    score: {
        type: Sequelize.INTEGER,
    },
});

module.exports = User;
