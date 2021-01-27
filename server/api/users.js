const router = require('express').Router();
const { User } = require('../database/models');
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
    try {
        const [user] = User.findOrCreate(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});
