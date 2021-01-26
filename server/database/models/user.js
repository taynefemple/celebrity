const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  teamName: {
    type: Sequelize.STRING
  }
})
