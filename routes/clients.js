const express = require('express');
const router = express.Router();


const db = require('../db/dbFunctions.js');

router.get('/', async (req, res) => {


   // exercises= {}
    const clients = await db.selectAllClients("chave")


    console.log(clients)
    res.send("sdsadsa")
    if (clients)
    {
        res.render('clients', {clients});
    }

    else {res.render('clients', {clients:  {}}) };
} 
);


module.exports = router;