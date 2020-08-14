const mongoose = require('mongoose');
let password = encodeURIComponent(process.env.xxx);  
mongoose.connect(`mongodb+srv://swiggerCompany:${password}@cluster0.w3igo.mongodb.net/swiggerCompany?retryWrites=true&w=majority`,{ useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true });
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    isEmployee:{
        type: Boolean,
        required:true
    }
    
    
});

userSchema.pre("save", function(next){
    bcrypt.genSalt(12)
    .then((salt)=>{
        bcrypt.hash(this.password, salt)
        .then((encryptPassword) =>{
            this.password = encryptPassword;
            next();
        })
        .catch(err => {
            console.log(`something in hashing \n ${err}`);
        
        })
    })
    .catch(err => {
        console.log(`something in salting \n ${err}`);
    })
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;