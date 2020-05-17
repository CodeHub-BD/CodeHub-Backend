require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

// Setting up environment variable
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

//connect to DATABASE
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
const DB = process.env.DATABASE_LOCAL_TEST;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// Running the server (not needed)

module.exports = app;
