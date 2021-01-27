const Sequelize = require('sequelize');
const db = require('../database');

const Clue = db.define('clue', {
    // do I need this id?
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hint: {
        type: Sequelize.STRING,
    },
});

module.exports = Clue;
