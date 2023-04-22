// imports
require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');

// Import MongoDB connection function from a separate module
const connectDB = require('./server/database/connection');

const app = express();
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({ secret: 'my secret key', saveUninitialized: true, resave: false })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// Connect to MongoDB database using the connectDB function
connectDB();

// Log HTTP requests with Morgan middleware
app.use(morgan('dev'));

// set template engine
app.set('view engine', 'ejs');

// Serve static files (folders CSS and JS) from the assets directory
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));

// route prefix
app.use('', require('./server/routes/routes'));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
