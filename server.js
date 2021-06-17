require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const videoRoute = require('./routes/videoRoutes');
app.use(videoRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connection succesful`);
    app.listen(PORT, () => {
      console.log(`Application is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
