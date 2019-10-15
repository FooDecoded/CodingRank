const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledLanguages: [
        {
        type: String, //would be either an array of JS & Ruby or an Array of one language
        required: true
        }
    ],
    currentLanguage:{
        type: String, // Will be an array of one element
        required: true
    },
    // Object so we have dyanmic keys
    languageProgress: { // level , levelProgress
        type: Object,
        required: true
    }
    ,

    points:{
        type: Number,
        default: 0,
        required: true
    },
    contests:{ // **** Need change
        type: Number,
        default: 0,
        required: true
    },
    online:{
        type: Boolean,
        required: false
    },
    admin:{
        type: Boolean,
        default: false
    } //By default, I am not an admin
})




const User = mongoose.model('users', UserSchema)
module.exports = User 


// OR

// module.exports = User = mongoose.model('users', UserSchema);