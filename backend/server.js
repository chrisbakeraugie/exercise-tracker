/**
 * The major difference between require and import, 
 * is that require will automatically scan node_modules to find modules, 
 *  but import, which comes from ES6, won't.
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; //This means use port 5000 for the server, but if it's not available, use another port

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

/**
 * Experimenting with launching on Heroku
 */
if(process.env.NODE_ENV === 'production'){
    app.use(express.static("../build"))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    })
}

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})