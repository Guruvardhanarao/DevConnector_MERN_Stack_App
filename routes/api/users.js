const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jsontoken = require('jsonwebtoken');
const passport = require('passport')

const User = require('./../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validators/register');

const router = express.Router();
router.get('/test', (req, res) => res.json({msg: 'test users...'}));

router.post('/register', (req, res) => {
    
    const {errors, isValid} = validateRegisterInput(req.body);
    console.log(isValid);
    if(isValid){
       return res.status(400).json(errors);
    }

    
    User.findOne({email:req.body.email})
        .then(email => {
            if(email) return res.status(400).json({error: 'Email already exists!'});
            const avatar = gravatar.url(req.body.email, {s: '400', r: 'pg', d: '400'});

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        })
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    console.log(password);
    //Find user by email
    User.findOne({email})
        .then(user => {
            // check for email matches
            if(!user){
                res.status(404).json({email : 'User not found'});
            }

            // check password matches
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //password not matched
                    if(!isMatch){
                        return res.status(400).json({password: 'Wrong password, please try again!'});
                    }

                    //Sign json web token
                    const payload = {
                        id:user.id,
                        name:user.name,
                        email:user.email
                    };

                    jsontoken.sign(
                        payload,
                        keys.secretOrKey, 
                        {expiresIn:3600},
                        (err, token) => {
                            res.json({success: true, token: `Bearer ${token}`})
                    })
                })
        })
        .catch(error => console.log(error));
});

router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log('/current', req);
    res.json({user: {
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    }
    });
});

module.exports = router;