// Get dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
let expressJwt = require("express-jwt");


// Get our API routes
const api = require('./server/routes/api');
const config = require('./server/config');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', expressJwt({secret: config.secret}));
app.use('/api/test', api);

//use auth routes for authentication
app.use("/auth", require("./server/routes/auth.routes.js"));

// Catches other routes and sends to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Get port from environment and store in Express.

const port = process.env.PORT || '3000';
app.set('port', port);

// Connect to MongoDB database.

mongoose.Promise = global.Promise;
mongoose.connect((config.database), function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected to the database!")
});

// Listen on provided port, on all network interfaces.

app.listen(port, () => console.log(`API running on localhost: ${port}`));
