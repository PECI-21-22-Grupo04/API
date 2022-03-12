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

router.get('/single/:id', async (req, res) => {
    
    // query db for this name will be id eventually

    const plan = await Plan.findOne({name : req.params.id});

    if (plan)
    {
       
        res.render('planDetails', {plan})
        


    }
    else{
        console.log('error')
    
    }

    


    // populate
    
});

router.post('/create', jsonParser, (req, res) => {
    console.log(req.body.name)
    console.log(req.body.difficulty)
    localStorage.setItem('name',req.body.name);
    const plan = new Plan({
        name: req.body.name,
        difficulty: req.body.difficulty,
        exerciseList: []

    }).save()
    .then(() => console.log('Plan created'));
    res.redirect('/plans/upload');
})

router.get('/create', async (req, res) => {
  
    

   
        res.render('createPlan')
    
})


router.post('/upload/exer' ,urlencodedParser,async (req, res) => {
    // add ex to plan


    console.log("Someone just pushed the button!")

    imgsSelected = req.body
    console.log(req.body)
    for(i=0; i<imgsSelected.length;i++)
    {   
        thumbnail="public"+imgsSelected[i].substr(21)
        // console.log(thumbnail) 
        var id = await Exercise.findOne({thumbnail}).select({_id:0 , exId:1})
        console.log(id.exId)
        pname = localStorage.getItem('name')
        // console.log("pname " + pname)
        var myplan = await Plan.findOne({name : pname})


         myplan.exerciseListID.push(id.exId);
       try{ 
           await myplan.save();
           
        }
        catch(e)
        {
            console.log(e)
        }
        
        
       

    }
    localStorage.clear()
    res.send("ok")


  
})



module.exports = router;