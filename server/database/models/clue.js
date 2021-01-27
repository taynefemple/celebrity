const Sequelize = require('sequelize');
const db = require('../database');

const Clue = db.define('clue', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hint: {
        type: Sequelize.STRING,
    },
});

module.exports = Clue;
