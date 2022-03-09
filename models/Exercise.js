const mongoose = require('mongoose');

let counter = 1;
const exerciseSchema = new mongoose.Schema({
    name:{type: String , unique : true, required : true},
    area: {type: String , unique : true, required : true},
    difficulty : {type: String , unique : true, required : true},
    thumbnail : {type: String , unique : true, required : true},
  //  _id: mongoose.Types.ObjectId
  exId : CountedId = {type: Number, default: () => counter++ }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
