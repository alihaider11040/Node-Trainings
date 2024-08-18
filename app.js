const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express(); 

app.use(bodyParser.json());

//----/api/places
//midlleware- auth
app.use('/api/places', placesRoutes);//1  -> return // return next(error);
app.use('/api/users', usersRoutes);//2 x

app.use((req, res, next) => {// 3
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect('mongodb+srv://manu:academind123@cluster0-ntrwp.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

