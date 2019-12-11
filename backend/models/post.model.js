const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    quotee: {
        type: String,
        default: "Anonymous"
    },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;