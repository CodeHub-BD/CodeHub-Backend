require('dotenv').config();
const app = require('./app');

// Setting up environment variable

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Running the server
app.listen(PORT, HOST, err => {
  if (err) {
    console.error('Problem starting the server!');
    throw err;
  }
  console.log(`Server running on https://${HOST}:${PORT}`);
});
