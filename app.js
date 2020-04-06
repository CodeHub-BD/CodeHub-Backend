const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const submissionRouter = require('./routes/submissionRoutes');

// Creating the express app
const app = express();

// Third party middlewares
app.use(morgan('dev'));
app.use(express.json());

// Setting up routes
app.get('/', (req, res, next) => {
  res.send('Hello World');
  next();
});

app.use('/users', userRouter);
app.use('/submission', submissionRouter);

// Exporting the express app
module.exports = app;
