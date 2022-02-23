// Modules
const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




// Database
mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connett to MongoDB...',err));



// Routes
const indexRoutes = require('./routes/index');
const uploadRoutes = require('./routes/upload');
const exercisesRoutes = require('./routes/exercises')

// Engine
app.set('view engine', 'ejs');

/* 
const exercisesSchema = new mongoose.Schema({
    name: String,
    area: String,
    difficulty : Number, 
    thumbnail : String    
});

const plansSchema = new mongoose.Schema({

});

const Test = mongoose.model('', Schema);
async function createTest(){
    const test = new Test({
        name: 'Diogob'
    });
    const result = await test.save();
    console.log(result);
} */
// createTest(); 
app.use(express.static('public')); 
app.use('/exercises', express.static('exercises'));

// use Routes
app.use(indexRoutes);
app.use('/upload', uploadRoutes);
app.use('/exercises',exercisesRoutes);
// port listening
app.get('/test', (req, res) => {
    res.render('test');
})
app.listen(5000, ()=>{
    console.log(`Listening on port 5000...`);
})