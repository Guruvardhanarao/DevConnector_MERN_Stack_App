const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// Parse application/json
app.use(bodyParser.json());

//DB Config
const dbUri = require('./config/keys').mongoDBUri;

// Mongo DB connection
mongoose
    .connect(dbUri)
    .then(() => console.log('MongoDB connected sucessfully...'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);


// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));