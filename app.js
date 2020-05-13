const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const submissionRouter = require('./routes/submissionRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Creating the express app
const app = express();

// Third party middlewares
app.use(morgan('dev'));
app.use(express.json());

// Setting up routes
app.use('/v1/users', userRouter);
app.use('/v1/submission', submissionRouter);

app.get('/v1', (req, res) => {
  res.json({ des: 'CodeHub Homepage' });
  //next();
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
// Exporting the express app
module.exports = app;
