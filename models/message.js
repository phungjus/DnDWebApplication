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

const Message = mongoose.model('Message', MessageSchema);
module.exports = { Message }