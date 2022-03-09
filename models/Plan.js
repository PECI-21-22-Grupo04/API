const mongoose = require('mongoose');


//import {exerciseSchema} from './Exercise'
const exerciseSchema = require('./Exercise').schema
const planSchema = new mongoose.Schema({
    //exerciseList: [ { type: exerciseSchema } ] ,
    exerciseListID: [ [Number] ] ,
    name: String,


   
});

module.exports = mongoose.model('Plan', planSchema);