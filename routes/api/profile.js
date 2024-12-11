const express = require('express');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const router = express.Router();
router.get('/test', (req, res) => res.json({msg: 'test profile...'}));

router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};

    Profile.findOne({user:req.user.id})
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile found for this User.";
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => console.log(err));
})

module.exports = router;