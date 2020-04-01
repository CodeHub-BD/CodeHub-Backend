const express = require('express');
const morgan = require('morgan');

// Creating the express app
const app = express();

// Third party middlewares
app.use(morgan('dev'));

// Setting up routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Exporting the express app
module.exports = app;
