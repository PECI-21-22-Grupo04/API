const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan')
const Exercise = require('../models/Exercise')

const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
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

router.post('/upload/exer',  urlencodedParser ,async (req, res) => {
    // add ex to plan


    console.log("Someone just pushed the button!")

    imgsSelected = req.body
    //console.log(req.body)
    for(i=0; i<imgsSelected.length;i++)
    {   
        thumbnail="public"+imgsSelected[i].substr(21)
        console.log(thumbnail) 
       var ids = await Exercise.find({thumbnail}).select({exId:1})
        const {id , exid} = ids
       console.log(exid)

    //    const newPlan = new Plan ({
    //        name: "test",
    //        exerciseListID:{ids}
    //    })

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