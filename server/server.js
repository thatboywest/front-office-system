const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const checkInRoute = require('./routers/Checkin'); 
const signinRoute= require("./routers/signin")
const LoginRoute=require("./routers/login")
const DriverRoute=require("./routers/Drivers")
const IdNumberRoute= require("./routers/IdNumber")
const reviewRouter = require("./routers/review")
const CheckIn = require('./models/CheckInSchema'); 



const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));





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
app.use('/api/signup', signinRoute);
app.use('/api/drivers',DriverRoute)
app.use('/api/track',IdNumberRoute)
app.use('/api/review', reviewRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
