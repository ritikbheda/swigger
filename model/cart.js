const mongoose = require('mongoose');
let password = encodeURIComponent(process.env.xxx);  
mongoose.connect(`mongodb+srv://swiggerCompany:${password}@cluster0.w3igo.mongodb.net/swiggerCompany?retryWrites=true&w=majority`,{ useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true });
const Schema = mongoose.Schema;

const cartModel = new Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: [
        {
            productId: String,
            quantity: Number,
            title: String,
            price: Number
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now()
    }

});



const cartM = mongoose.model('cartModel', cartModel);
module.exports = cartM;