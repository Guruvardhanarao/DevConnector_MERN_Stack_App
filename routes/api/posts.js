const express = require('express');
const passport = require('passport');

//Post model
const Post = require('../../models/Post');

//Import Validation for Post
const validatePostInput = require('../../validators/post');


const router = express.Router();
router.get('/test', (req, res) => res.json({msg: 'test posts route...'}));

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
})

module.exports = router;