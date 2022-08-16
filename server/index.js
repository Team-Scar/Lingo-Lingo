/* ==== External Modules === */
const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const db = require('../db');
const eventRouter=require('./routes/events.js');

/* ==== Internal Modules === */
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const controllers = require('./controllers/index.js');


/* ==== Middleware === */
app.use(express.json());
app.use((req, res, next) => {
  console.log(
      `*=== \x1b[34mNew Request Logged:\x1b[0m Type: \x1b[33m${req.method}\x1b[0m REQUEST, URL: \x1b[33m${req.url}\x1b[0m ===*`,
  );
  next();
});
app.use(express.static(path.join(__dirname, '../client/public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());


/* ==== Route Handlers === */
app.get('/posts', controllers.getPosts);
app.get('/livechat', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
app.use(eventRouter);

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.post('/signup', (req, res) => {
  console.log(req.body);
});


/* ==== Server Binding === */
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
