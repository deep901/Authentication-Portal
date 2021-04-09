const mongoose = require('mongoose');
// userSchema
const userSchema = new mongoose.Schema({
    name:{
        type:'string',
        required:true
    },
    email:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true
    },
    date:{
        type:'date',
        default:Date.now()
    }

})
 
// while installing nodemon and dotenv use npm --save-dev nodemon dotenv bcz these are dev dependencies
module.exports = mongoose.model('MyUser', userSchema);
