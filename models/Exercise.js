const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: String,
    area: String,
    difficulty : String, 
    thumbnail : String    
});

module.exports = mongoose.model('Exercise', exerciseSchema);
