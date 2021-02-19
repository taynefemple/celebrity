const Sequelize = require('sequelize');
const db = require('../database');

const Clue = db.define('clue', {
    celebName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hint: {
        type: Sequelize.STRING,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Clue;
