const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest : './public/exercises/'});

const db = require('../db/dbFunctions.js');

router.get('/', (req, res) => {
    res.render('upload')
});

router.post('/', upload.single('file'), async (req, res) => {


    if (req.body.names && req.body.difficulty && req.body.area && req.file.path)
    {    
        console.log("file path:" + req.file.path)
        console.log(req.body)
        const f =  req.file.path;

        const newssdas = await db.createExercise(req.body.names ,  req.body.difficulty , "e_description", req.body.area ,req.file.path,"videoPath");
        console.log(newssdas)
        if (newssdas == 0)
        {
            console.log('Exercise Uploaded');
            res.redirect('/exercises');
        }

        else
        {
         console.log('e')
        }
    }
    
    else
    {
        console.log('need more parameters')
    }
    
})

module.exports = router;