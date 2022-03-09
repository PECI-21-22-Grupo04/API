const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest : './public/exercises/'});
const Exercise = require('../models/Exercise')
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.render('upload')
});

router.post('/', upload.single('file'),(req, res) => {
    console.log(req.file.path)
    const exercise = new Exercise({
        name: req.body.names,
        area: req.body.area,
        difficulty: req.body.difficulty,
        thumbnail: req.file.path,
        
    }).save()
    .then(() => console.log('Exercise Uploaded'));
    res.redirect('/upload');
})

module.exports = router;