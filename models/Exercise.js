const mongoose = require('mongoose');

let counter = 1;
const exerciseSchema = new mongoose.Schema({
    name: String,
    area: String,
    difficulty : String, 
    thumbnail : String ,
  //  _id: mongoose.Types.ObjectId
  exId : CountedId = {type: Number, default: () => counter++}
});

module.exports = mongoose.model('Exercise', exerciseSchema);
