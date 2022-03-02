const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise')

router.get('/', async (req, res) => {
    console.log(req.query.object + ' . ')
    const exercises = await Exercise.find(req.query);
    res.render('exercises', {exercises: exercises});
});

router.post('/', async (req, res) => {
    res.redirect('/exercises?difficulty=easy');
})

/* route.get('/images/:filename', (req, res) => {

}) */

module.exports = router;