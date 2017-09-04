const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment_post_id : {
        type: String,
        required: true
    },
    comment_author: {
        type: String,
        required: true
    },
    comment_author_id: {
        type: String,
        required: true
    },
    comment_date: {
        type: String,
        required: true
    },
    comment_content: {
        type: String,
        required: true
    }
});

const Comments = module.exports = mongoose.model('post_comment', commentSchema);


module.exports.getCommentByPostID = function(post_id, callback){
    let query = {comment_post_id:post_id};
    Comments.find(query, callback);
}


module.exports.addComment = function(newComment, callback){
    newComment.save(callback);
}

module.exports.deleteComments = function(post_id,callback){
    let query = {comment_post_id:post_id};
    Comments.remove(query,callback);
}