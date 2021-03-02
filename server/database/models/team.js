const { ENUM } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../database');

const Team = db.define('team', {
    score: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Team;
