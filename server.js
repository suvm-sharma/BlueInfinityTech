const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config('.env');
const userRoute = require('./routes/userRoutes');

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DataBase is connected Successfully!!');
  })
  .catch(() => {
    console.error('Error getting from DataBase');
  });

const port = process.env.PORT || 1997;

app.use(express.json()); // in built middleware
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Port is running on ${port}...`);
});
