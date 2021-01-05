const mongoose  = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userPosted: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
},  {
    timestamps: true
});

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
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    postComments: [CommentSchema],
}, {timestamps: true
})

const Post = mongoose.model('Post', PostSchema);
module.exports = { Post }