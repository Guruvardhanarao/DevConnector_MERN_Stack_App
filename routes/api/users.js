const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jsontoken = require('jsonwebtoken');
const passport = require('passport')

const User = require('./../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');

const router = express.Router();
router.get('/test', (req, res) => res.json({msg: 'test users...'}));

router.post('/register', (req, res) => {
    
    const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid){
       return res.status(400).json(errors);
    }

    
    User.findOne({email:req.body.email})
        .then(email => {
            if(email){ 
                errors.email = 'Email already registered!';
                return res.status(400).json(errors);
            };
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
    const {errors, isValid}  = validateLoginInput(req.body);

    //Find user by email
    User.findOne({email})
        .then(user => {
            // check for email matches
            if(!user){
                errors.email = 'User not found'
                res.status(404).json(errors);
            }

            // check password matches
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    //password not matched
                    if(!isMatch){
                        errors.passport = 'Wrong password, please try again!'
                        return res.status(400).json(errors);
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
    res.json({
        user: {
            id:req.user.id,
            name:req.user.name,
            email:req.user.email
        }
    });
});

module.exports = router;