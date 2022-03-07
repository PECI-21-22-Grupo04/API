const mongoose = require('mongoose');

//import {exerciseSchema} from './Exercise'
const exerciseSchema = require('./Exercise').schema
const planSchema = new mongoose.Schema({
    exerciseList: [ { type: exerciseSchema } ] 
});

module.exports = mongoose.model('Plan', planSchema);