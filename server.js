const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB Config
const dbUri = require('./config/keys').mongoDBUri;

// Mongo DB connection
mongoose
    .connect(dbUri)
    .then(() => console.log('MongoDB connected sucessfully...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world'));

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));