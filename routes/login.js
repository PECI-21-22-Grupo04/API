const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});


router.post('/', (req, res) => {

    res.send('todo, with firebase auth');
});

module.exports = router;