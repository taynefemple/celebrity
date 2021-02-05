const router = require('express').Router();
const { Clue } = require('../database/models');
module.exports = router;

// rounds 1 and 3
router.get('/', async (req, res, next) => {
    try {
        const clues = await Clue.findAll();
        console.log(`THE CLUES: ${JSON.stringify(clues)}`)
        res.json(clues);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    console.log(`HIT POST ROUTE WITH ${JSON.stringify(req.body)}`)
    try {
        console.log(`in the try block ${req.body}`)
        const clue = await Clue.create(req.body);
        console.log(`THE CLUE: ${clue}`)
        res.json(clue);
    } catch (err) {
        next(err);
    }
});
