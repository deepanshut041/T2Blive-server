const express = require('express');
const router = express.Router();
const Post = require('../../models/blog/post');
const Comments = require('../../models/blog/comment.js');

router.get('/', (req, res, next)=>{
    Post.getPosts((err, post)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(post);
        }
    })
});

router.get('/:id', (req, res, next)=>{
    let id = req.params.id
    Post.getPostById(id,(err, post)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(post);
        }
    })
});

router.get('/category/:type', (req, res, next)=>{
    let category = req.params.type
    Post.getPostByCategory(category, (err, post)=>{
        if (err) {
            res.json({success:false,msg:"Category not found"});
        } else {
            if(post.lenght !=0){
                res.json(post);
            }
            else{
                res.json({success:false,msg:"Category not found"})
            }
        }
    })
});
router.get('/author/:id', (req, res, next)=>{
    let id = req.params.id
    Post.getPostByAuthorId(id, (err, post)=>{
        if (err) {
            res.json({success:false,msg:"Category not found"});
        } else {
            console.log(post)
            if(post.lenght !=0){
                res.json(post);
            }
            else{
                res.json({success:false,msg:"Category not found"})
            }
        }
    })
});

router.post('/', (req, res, next)=>{
    
    let date = (new Date()).toString().split(' ').splice(1,3).join(' ');
    let newPost =new  Post({
        post_type: req.body.post_type,
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_author: req.body.post_author,
        post_authorId:req.body.post_authorId,
        post_imgurl: req.body.post_imgurl,
        post_date: date,
        comment_count: 0
    });

    Post.addPost(newPost, (err, post)=>{
        if (err) {
            res.json({success:false, msg:"Failed to post the post"});
            console.log(err);
        } else {
            res.json({success:true, msg:"Posted succefully"});
        }
    })

});

router.patch('/:id', (req, res, next)=>{
    let postId = req.params.id;
    let newPost ={$set:{
        post_type: req.body.post_type,
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_author: req.body.post_author,
        post_imgurl: req.body.post_imgurl
    }};
    Post.updatePost(postId, newPost, (err, post)=>{
        if (err) {
            res.json({success:false, msg:"Failed to update post "});
            console.log(err);
        } else {
            res.json({success:true, msg:"Updated post succefully"});
        }
    })

});

router.delete('/:id', (req, res, next)=>{
    let postId = req.params.id;
    Post.deletePost(postId, (err, result)=>{
        if (err) {
            res.json({success:false, msg:"Failed to delete post "});
            console.log(err);
        } else {
            res.json({success:true, msg:"Deleted post succefully"});
        }
    });
});

router.get('/:id/comments', (req, res, next)=>{
    let postId = req.params.id;
    Comments.getCommentByPostID(postId, (err, post)=>{
        if (err) {
            res.json({"error":"error"});
            console.log(err)
        } else {
            res.json(post);
        }
    })

});

router.post('/:id/comments', (req, res, next)=>{
    let postId = req.params.id
    let date = (new Date()).toString().split(' ').splice(1,3).join(' ');
    let newPost =new  Comments({
        comment_post_id: postId,
        comment_author: req.body.comment_author,
        comment_author_id: req.body.comment_author_id,
        comment_date: date,
        comment_content: req.body.comment_content
    });

    Comments.addComment(newPost, (err, user)=>{
        if (err) {
            res.json({success:false, msg:"Failed to Comment on the post"});
            console.log(err)
        } else {
            Post.updatePostCommentCounter(postId,{$inc:{comment_count: 1}}, (err, post)=>{
                if (err) {
                    res.json({success:false, msg:"Failed to update comment count on the post"});
                    console.log(err)
                } else {
                    res.json({success:true, msg:"Commented succesfully"});
                }
            });
        }
    });
});
router.delete('/:id/comments', (req, res, next)=>{
    let postId = req.params.id;
    Comments.deleteComments(postId, (err, result)=>{
        if (err) {
            res.json({success:false, msg:"Failed to delete post "});
            console.log(err);
        } else {
            res.json({success:true, msg:"Deleted post succefully"});
        }
    });
});
module.exports = router;