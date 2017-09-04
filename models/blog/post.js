const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    post_type : {
        type: String,
        required: true
    },
    post_title: {
        type: String,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    post_author: {
        type: String,
        required: true
    },
    post_authorId: {
        type: String,
        required: true
    },
    post_imgurl: {
        type: String,
        required: true
    },
    post_date: {
        type: String,
        required: true
    },
    comment_count: {
        type: Number,
        required: true
    }
});

const Post = module.exports = mongoose.model('post', postSchema);

//Create 
module.exports.addPost = function(newPost, callback){
    newPost.save(callback);
}

//Update
module.exports.updatePost = function(id,newPost, callback){
    Post.findByIdAndUpdate(id, newPost, callback);
}
module.exports.updatePostCommentCounter = function(id,newPost, callback){
    Post.findByIdAndUpdate(id, newPost, callback);
}

//Read
module.exports.getPosts = function (callback) {
    Post.find({},callback);
}

module.exports.getPostById = function (id, callback) {
    Post.findById(id, callback);
}

module.exports.getPostByCategory = function(post_type, callback){
    const query = {post_type:post_type};
    Post.find(query, callback);
}

module.exports.getPostByAuthor = function(author, callback){
    const query = {post_author:author};
    Post.find(query, callback);
}

module.exports.getPostByAuthorId = function(authorId, callback){
    const query = {post_authorId:authorId};
    console.log(query);
    Post.find(query, callback);
}

//Delete
module.exports.deletePost = function(id, callback){
    Post.findByIdAndRemove(id,callback);
}

