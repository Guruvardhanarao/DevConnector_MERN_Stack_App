const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB Config
const dbUri = require('./config/keys').mongoDBUri;

// Mongo DB connection
mongoose
    .connect(dbUri)
    .then(() => console.log('MongoDB connected sucessfully...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello world'));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));