const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan')

router.get('/', async (req, res) => {


    const plans = await Plan.find(req.query);

    if (plans)
    {
        res.render('plans', {plans});
    }

    else {res.render('plans', {plans: {} });
} 
});


module.exports = router;