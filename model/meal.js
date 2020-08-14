const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    foodCategory:{
      type: String,
      required: true  
    },
    numOFcontains:{
        type: Number,
        required: true
    },
    imgAddress:{
        type: String
    },
    topMeal: {
        type: Boolean,
        required: true
    },
    dateCreated:{
        type: Date,  
        default: Date.now()
    }
});

const mealModel = mongoose.model('mealModel', productSchema);
module.exports = mealModel  ;
