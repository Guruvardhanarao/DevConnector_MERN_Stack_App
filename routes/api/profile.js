const express = require('express');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const validateProfileInput = require('../../validators/profile');

const router = express.Router();
router.get('/test', (req, res) => res.json({msg: 'test profile...'}));

// @Route GET api/profile
// @Desc get current profile
// @Access private
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};

    Profile.findOne({user:req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile found for this User.";
                return res.status(404).json(errors);
            }
            res.json(profile)
        })
        .catch(err => console.log(err));
});

// @Route GET api/profile/handle/:handle
// @Desc get profile by handle name
// @Access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({handle: req.params.handle})
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = 'Profile not found';
                    res.status(404).json(errors);
                }
                res.status(200).json(profile);
            })
            .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
});

// @Route api/profile/user/:user_id
// @Desc get user data by user id
// @Access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.profile = 'Profile not found';
                res.status(404).json(errors);
            }
            res.status(200).json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
});

// @Route POST api/profile
// @Desc create or update current profile
// @Access private
router.post('/', (req, res) => {

    const {isValid, errors} = validateProfileInput(req.body);

    //check for validation errors
    if(!isValid){
       return res.status(400).json(errors);
    }

    //map request body data
    const profileFields = {};

    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skills 
    if(req.body.skills) profileFields.skills = req.body.skills.split(',');

    //social fields
    profileFields.social = {};

    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;


    //check profile exists
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile){
                //update existing profile
                Profile
                .findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
                .then(profile => res.json(profile))
                .catch(err => console.log(err));

            } else {
                //create new profile and save

                //check if handle exists in the db
                Profile.findOne({handle: profileFields.handle})
                    .then(profile => {
                        if(profile) {
                            res.status(400).json({error: 'That handle already exists'});
                        }
                        
                        //save new profile
                        new Profile(profileFields).save().then(profile => res.json(profile))
                })
            }
        })

});

module.exports = router;