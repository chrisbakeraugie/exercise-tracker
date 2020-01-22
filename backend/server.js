/**
 * The major difference between require and import, 
 * is that require will automatically scan node_modules to find modules, 
 *  but import, which comes from ES6, won't.
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONG_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connect = mongoose.connection;
connect.once('open', () => {
    console.log("MongoDB database connection established successfully!")
})
app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})