const mongoose = require('mongoose');


//import {exerciseSchema} from './Exercise'
const exerciseSchema = require('./Exercise').schema
const planSchema = new mongoose.Schema({
    exerciseListID: { type: [Number], required: true } ,
    name:{type: String , unique : true, required : true} ,
    difficulty: String,

   
});

module.exports = mongoose.model('Plan', planSchema);


// <% if(plans.exerciseListID.length > 0) {%>
//     <% plans.exerciseListID.forEach(function(plan) { %>     
//       <div class="col">plan %> </div>
//       <% })%>
//       <% } else {%>
//         <p>No exercises</p>
//       <% } %>