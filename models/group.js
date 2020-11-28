const mongoose  = require('mongoose');
const GroupSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description :{
        type: String
    },
    admin: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    users: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    messages: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }]
})

const Group = mongoose.model('Group', GroupSchema);
module.exports = { Group }