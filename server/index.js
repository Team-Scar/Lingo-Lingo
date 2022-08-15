/* ==== External Modules === */
const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});


/* ==== Internal Modules === */
const app = express();
const PORT = process.env.PORT || 3000;
const {getPosts} = require('./controllers/forums.js');


/* ==== Middleware === */
app.use(express.json());
app.use((req, res, next) => {
  console.log(
      `*=== \x1b[34mNew Request Logged:\x1b[0m Type: \x1b[33m${req.method}\x1b[0m REQUEST, URL: \x1b[33m${req.url}\x1b[0m ===*`,
  );
  next();
});
app.use(express.static(path.join(__dirname, '../client/public')));


/* ==== Route Handlers === */
app.get('/posts', () => {
  console.log(controllers);
  getPosts();
});
app.get('/livechat', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


/* ==== Server Binding === */
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
