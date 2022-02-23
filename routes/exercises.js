const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise')

router.get('/', async (req, res) => {
    const exercises = await Exercise.find();
    res.render('exercises', {exercises: exercises});
});

/* route.get('/images/:filename', (req, res) => {

}) */

module.exports = router;