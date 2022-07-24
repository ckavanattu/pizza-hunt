const { Schema, model } = require('mongoose');

const CommentSchema = newSchema({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdat: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;