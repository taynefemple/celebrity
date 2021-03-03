const router = require('express').Router();
const { User, Team } = require('../database/models');
module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['name', 'team'],
        });
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// TODO -- add route for setting turn to false
// router.put yadda yadda
router.get('/:playerName', async (req, res, next) => {
    try {
        const userTurn = await User.findOne({
            where: {
                name: req.params.playerName,
            },
            attributes: ['turn'],
        });
        res.json(userTurn);
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    console.log(req.body);
    try {
        const [user] = await User.findOrCreate({
            where: {
                name: req.body.name,
                teamId: req.body.teamId,
            },
        });
        res.json(user);
    } catch (err) {
        next(err);
    }
});
