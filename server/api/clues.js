const router = require('express').Router();
const { Clue } = require('../database/models');
module.exports = router;

// rounds 1 and 3
router.get('/', async (req, res, next) => {
    try {
        const clues = await Clue.findAll();
        res.json(clues);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const [clue] = Clue.create(req.body);
        res.json(clue);
    } catch (err) {
        next(err);
    }
});
