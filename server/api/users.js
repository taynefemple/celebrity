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

router.put('/', async (req, res, next) => {
    console.log(req.body)
    try {
        const [user] = await User.findOrCreate({
            where: {
                name: req.body.name,
                teamId: req.body.teamId
                },
        });
        res.json(user);
    } catch (err) {
        next(err);
    }
});
