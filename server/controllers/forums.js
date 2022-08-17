const {queryPosts} = require('../../db/controllers/forums.js');
const {submitPost} = require('../../db/controllers/forums.js');
const {upvotePost} = require('../../db/controllers/forums.js');
const {downvotePost} = require('../../db/controllers/forums.js');

const getPosts = (req, res) => {
  // console.log(req);
  queryPosts()
      .then((results) => {
        res.send(results.rows);
      });
};

const addPost = (req, res) => {
  submitPost(req.body)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log(err);
        res.send('upload failed');
      });
};

const upvote = (req, res) => {
  console.log(req.body);
  upvotePost(req.body.id)
      .then((result) => {
        res.send('upvote received');
      })
      .catch((err) => {
        res.send(err);
      });
};

const downvote = (req, res) => {
  console.log(req.body);
  downvotePost(req.body.id)
      .then((result) => {
        res.send('downvote received');
      })
      .catch((err) => {
        res.send(err);
      });
};

module.exports.getPosts = getPosts;
module.exports.addPost = addPost;
module.exports.upvote = upvote;
module.exports.downvote = downvote;
