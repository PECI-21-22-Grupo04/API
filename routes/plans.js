const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan')
const Exercise = require('../models/Exercise')


router.get('/', async (req, res) => {


    const plans = await Plan.find(req.query);

    if (plans)
    {
        res.render('plans', {plans});
    }

    else {res.render('plans', {plans: {} });
} 
});
router.get('/upload', async (req, res) => {
    const exercises = await Exercise.find(req.query);

    if (exercises)
    {
        res.render('uploadPlan', {exercises})
    }
    
});
router.post('/upload', (req, res) => {
    console.log(req.file.path)
    const plan = new Plan({
      
        exerciseList: []

    }).save()
    .then(() => console.log('Plan created'));
    res.redirect('/upload');
})


module.exports = router;