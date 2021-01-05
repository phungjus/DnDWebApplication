const mongoose  = require('mongoose');
const MessageSchema = new mongoose.Schema({
    message :{
        type: String
    },
    userPosted: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Message', MessageSchema);