const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Post Schema
const PostSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type:String,
    },
    avatar: {
        type:String
    },
    text: {
        type: String,
        required: true
    },
    likes:[
        {
            user: {
                type:Schema.Types.ObjectId,
                ref: 'User'
            } 
        }
    ],
    comments: [
        {
            user: {
                type:Schema.Types.ObjectId,
                ref: 'User'
            },
            text:{
                type: String,
                required: true
            },
            name: {
                type:String
            },
            avatar: {
                type:String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);