const router = require('express').Router();
const { Clue } = require('../database/models');
module.exports = router;

// rounds 1 and 3
router.get('/', async (req, res, next) => {
    try {
        const clues = await Clue.findAll({
            where: {
                active: true,
            },
            attributes: ['id', 'celebName', 'hint'],
        });
        res.json(clues);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const clue = await Clue.create(req.body);
        res.json(clue);
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    try {
        console.log(`GOT CLUE TO MARK INACTIVE: ${JSON.stringify(req.body)}`);
        const clue = await Clue.findOne({
            where: {
                id: req.body.id,
            },
        });
        clue.active = false;
        const inactiveClue = await clue.save();
        res.json(inactiveClue);
    } catch (err) {
        next(err);
    }
});
