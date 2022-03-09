const mongoose = require('mongoose');


//import {exerciseSchema} from './Exercise'
const exerciseSchema = require('./Exercise').schema
const planSchema = new mongoose.Schema({
    exerciseListID: [ [Number] ] ,
    name:{type: String , unique : true, required : true} ,
    difficulty: String,

   
});

module.exports = mongoose.model('Plan', planSchema);