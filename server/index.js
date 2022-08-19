/* ==== External Modules === */
const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const db = require('../db');
const eventRouter=require('./routes/events.js');
const profileRouter=require('./routes/profiles.js');

/* ==== Internal Modules === */
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const controllers = require('./controllers/index.js');
const routes = require('./routes');


/* ==== Middleware === */
app.use(express.json());
app.use((req, res, next) => {
  console.log(
      `*=== \x1b[34mNew Request Logged:\x1b[0m Type: \x1b[33m${req.method}\x1b[0m REQUEST, URL: \x1b[33m${req.url}\x1b[0m ===*`,
  );
  next();
});
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());


/* ==== Route Handlers === */
app.get('/languages', controllers.languages);

app.post('/language', controllers.languageId);

app.get('/jargons', controllers.jargons);

app.post('/jargon', controllers.jargonId);

app.post('/profile', controllers.profile);

app.post('/languages', controllers.userLanguages);

app.post('/jargons', controllers.userJargons);

app.get('/posts', controllers.getPosts);

app.get('/posts/filter', controllers.filtered);

app.post('/posts', controllers.addPost);

app.post('/upvote', controllers.upvote);

app.post('/downvote', controllers.downvote);

app.get('/posts/:postID', controllers.getPost);

app.get('/responses/:postID', controllers.getResponses);

app.get('/livechat', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
app.use(profileRouter);
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// // app.get('/profile/:userID', controllers.getUserProfile);


app.get('/profile/:userID', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});
app.use(eventRouter);
app.use(routes);

app.get('/discussions', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

/* ==== Server Binding === */
const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

/* ==== Socket Binding === */
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({recipients, text}) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text,
      });
    });
  });
});

module.exports = {
  server,
  express,
  path,
};
