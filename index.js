const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (!err) console.log("Connected to DB");
    else console.log(err);
  });


app.use(bodyParser.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);


