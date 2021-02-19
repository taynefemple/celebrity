const router = require('express').Router();
const { Team } = require('../database/models');
module.exports = router;

// Todo: use this route only for updating score
router.post('/', async (req, res, next) => {
    try {
        const team = await Team.bulkCreate([
            {score: 0},
            {score: 0}
        ]);
        res.json(team);
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const score = await Team.update(req.body)
    } catch (err) {
        next(err);
    }
})
