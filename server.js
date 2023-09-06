const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const adsRoutes = require('./routes/ads.routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');

const app = express();



const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

//if(NODE_ENV === 'production') dbUri = `mongodb+srv://masik09:${process.env.DB_PASS}@cluster0.lfy7bmc.mongodb.net/AnnouncementsDB?retryWrites=true&w=majority`;
//else dbUri = 'mongodb://127.0.0.1:27017/AnnouncementsDB';

mongoose.connect(`mongodb+srv://masik09:${process.env.DB_PASS}@cluster0.lfy7bmc.mongodb.net/AnnouncementsDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'asdada',
  store: MongoStore.create({
    mongoUrl: dbUri,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    //collectionName: 'session',
    cookie: {
      secure: process.env.NODE_ENV == 'production',
      httpOnly: true,
      maxAge: 3600000,
    }
  }),
  resave: false,
  saveUninitialized: false,
}))

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
  });



module.exports = server;
