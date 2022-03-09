const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan')
const Exercise = require('../models/Exercise')

const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser());

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

router.post('/create', jsonParser, (req, res) => {
    console.log(req.body.name)
    console.log(req.body.difficulty)

    const plan = new Plan({
        name: req.body.name,
        difficulty: req.body.difficulty,
        exerciseList: []

    }).save()
    .then(() => console.log('Plan created'));
    res.redirect('/');
})

router.get('/create', (req, res) => {
  
    res.render('createPlan')
})


router.post('/upload/exer',  urlencodedParser ,async (req, res) => {
    // add ex to plan


    console.log("Someone just pushed the button!")

    imgsSelected = req.body
    //console.log(req.body)
    for(i=0; i<imgsSelected.length;i++)
    {   
        thumbnail="public"+imgsSelected[i].substr(21)
        console.log(thumbnail) 
        var id = await Exercise.findOne({thumbnail}).select({_id:0 , exId:1})
        console.log(id.exId)
        
        
       

    //    const result = await newPlan.save();
    //    console.log("was save succ ? " + result)
       // we got ids, lets add them
    }


    // fetch this id so i can populate plan
    
    // Plan.find().populate(
    //     {
            
    //     }
    // ).exec()
    res.send('ok')
  
})



module.exports = router;