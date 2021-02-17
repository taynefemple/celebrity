const Clue = require('./clue');
const Team = require('./team');
const User = require('./user');

User.belongsTo(Team);

module.exports = {
    Clue,
    Team,
    User,
};
