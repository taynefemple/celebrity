const router = require('express').Router()
const { Clue } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clues = await Clue.findAll()
    res.json(clues)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // add clue to db
})
