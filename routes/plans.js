const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../db/dbFunctions.js');



router.use(bodyParser());

router.get('/', async (req, res) => {

    
    const plans = await db.selectAllPrograms()
    const parsed_data = JSON.parse(JSON.stringify(plans))[0]

    if (plans)
    {
        res.render('plans', {plans : parsed_data});
    }

    else 
    {
        res.render('plans', {}) 
    }




});
router.get('/upload', async (req, res) => {
 
    const exercises = await db.selectAllExercises()
    const parsed_data = JSON.parse(JSON.stringify(exercises))[0]
    console.log(parsed_data.e_name)

    if (exercises)
    {
        res.render('uploadPlan', {exercises :parsed_data })
    }

    else 
    {
        res.render('exercises', {}) 
    }

    
});

router.get('/single/:name', async (req, res) => {
    
    // query db for this name will be id eventually

    const plans = await db.selectProgramFromName(req.params.name);
    const parsed_data = JSON.parse(JSON.stringify(plans))[0]

    if (plans)
    {
        res.render('planDetails', {plan : parsed_data})

    }
    else{
        res.send('error')
        console.log('error')
    
    }

    


    // populate
    
});

router.post('/create', jsonParser, async (req, res) => {
    localStorage.setItem('name',req.body.name);

    const plan = await db.createProgram(req.body.name,req.body.description,"")
    if (plan==0)
    {
        res.redirect('/plans/upload');
    }
    else
    {
        console.log(plan)
        console.log("something went wrong")
    }
  
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
        console.log(thumbnail) 
        
         // find from thumb
        const exer = await db.SelectExerFromThumb(thumbnail)
        const parsed_data = JSON.parse(JSON.stringify(exer))[0]
       // var id = await Exercise.findOne({thumbnail}).select({_id:0 , exId:1})
        console.log(parsed_data)

        // find the plan we are creating.
        // add this ex to it.

    //     pname = localStorage.getItem('name')
    //     var myplan = await Plan.findOne({name : pname})
    //     myplan.exerciseListID.push(id.exId);
    //     await myplan.save();
           

        
       

    }
    localStorage.clear()
    res.send("ok")


  
})



module.exports = router;