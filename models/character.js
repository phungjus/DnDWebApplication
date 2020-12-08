const mongoose  = require('mongoose');
const CharacterSchema = new mongoose.Schema({
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    name:{
        type:String,
        required: true
    },
    level :{
        type: Number,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: true
    },
    ideals: {
        type: String,
        required: true
    },
    bonds: {
        type: String,
        required: true
    },
    flaws: {
        type: String,
        required: true
    },
    stats: {
        type: [Number],
        required: true
    },
    proficiency: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    hp: {
        type: Number,
        required: true
    }
})

const Character = mongoose.model('Character', CharacterSchema);
module.exports = { Character }