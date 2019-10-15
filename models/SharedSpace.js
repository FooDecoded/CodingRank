const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SharedSpaceSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    onlineUsers: [
        {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true        }
    ]
})

module.exports = SharedSpace = mongoose.model('sharedSpaces', SharedSpaceSchema);