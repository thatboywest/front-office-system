const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const checkInRoute = require('./routers/Checkin'); 
const signinRoute= require("./routers/signin")
const LoginRoute=require("./routers/login")
const CheckIn = require('./models/CheckInSchema'); 



const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect('mongodb+srv://morgingairaz:user254@front.lyiojrr.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
  app.get('/', (req, res) => {
    res.send('Welcome to the root of the application!');
  });
app.use('/api/checkin', checkInRoute);
app.use('/api/login',LoginRoute );
app.use('/api/signup', signinRoute)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
