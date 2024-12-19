const express = require('express');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');

//Profile Model
const Profile = require('../../models/Profile');

//Import Validation for Post
const validatePostInput = require('../../validators/post');


const router = express.Router();
router.get('/test', (req, res) => res.json({msg: 'test posts route...'}));

// Route    POST api/posts
// Desc     create a post
// Access   Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log(req.user.id)
    const {isValid, errors} = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));
});

// Route    GET api/posts/all
// Desc     Gel all posts
// Access   Public
router.get('/all', (req, res) => {
    Post.find().then(posts => {
        res.json(posts)
    })
    .catch(err => res.status(404).json({noposts : 'No Posts found'}))
});

// Route    GET api/posts/:id
// Desc     Get a post by id
// Access   Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(!post){
                return res.status(400).json({nopostfound: 'Post not found'})
            } 
                
            res.json(post);
        })
        .catch(err => res.status(404).json({nopostfound: 'Post not found'}));
});

// Route    DELETE api/posts/:id
// Desc     Delete a post by id
// Access   Public
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id).then(post => {
                if(post.user.toString() !== req.user.id){
                    return res.status(401).json({notauthorized: 'User not authorized'});
                }

                post.deleteOne().then(() => res.json({Sucess: true}))
                    .catch(err => res.json({Success:true}));
            })
            .catch(err => res.status(404).json({nopostfound : 'No post found'}));
        });
        
});

// Route    POST api/posts/like/:id
// Desc     Add like to a post by id
// Access   Private
router.post('/like/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user:req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //check post already liked
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyliked: 'User already like this post'});
                    }

                    //add user to likes array
                    post.likes.unshift({user: req.user.id});

                    //save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({nopostfound: 'No post found'}));
        });
});

// Route    POST api/posts/unlike/:id
// Desc     Add unlike to a post by id
// Access   Private
router.post('/unlike/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //check if user likes the post previously and return error
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({notliked: 'User has not liked this post'});
                    }

                    //to unlike remove the uer from the likes array
                    const removeIndex =  post.likes.findIndex(like => like.user.toString() === req.user.id);
                    post.likes.splice(removeIndex,1);

                    //save
                    post.save().then(post => res.json(post));
                });
        })
        .catch(err => res.status(404).json({nopostfound: 'No post found'}));
});

// Route    POST api/posts/comment/:post_id
// Desc     Add comment to a post by post_id
// Access   Private
router.post('/comment/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const {isValid, errors} = validatePostInput(req.body);

    // Check validation of comment
    if(!isValid){
        return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user:req.user.id
            };

            //Add comment to a post's comment array
            post.comments.unshift(newComment);

            //save post
            post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({postnotfound: 'No post found'}));
});

// Route    DELETE api/posts/comment/:post_id/:comment_id
// Desc     delete comment to a post by post_id and comment_id
// Access   Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Post.findById(req.params.post_id).then(post => {
      //check comments length
      if(post.comments.length === 0){
        return res.status(404).json({nocooments: 'No comments found for this post'});
      }
      
      const deleteIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.comment_id);

      if(deleteIndex < 0){
        return res.status(404).json({nocooment: 'No comment found for this post'});
      }

      //remove comment
      post.comments.splice(deleteIndex, 1);

      //save
      post.save().then(post => res.json(post));
      
    })
    .catch(err => res.status(404).json({nopostfound: 'No post found'}))
});

module.exports = router;