const mongoose  = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    post :{
        type: String,
        required: true
    },
    userPosted: {
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    postComments: [{
        type:mongoose.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
})

const Post = mongoose.model('Post', PostSchema);
module.exports = { Post }