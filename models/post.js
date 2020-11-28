const mongoose  = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    post :{
        type: String
    },
    userPosted: {
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    userComments: [{
        type:mongoose.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
})

const Post = mongoose.model('Post', PostSchema);
module.exports = { Post }