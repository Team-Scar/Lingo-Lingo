const {queryPosts} = require('../../db/controllers/forums.js');
const {submitPost} = require('../../db/controllers/forums.js');

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

module.exports.getPosts = getPosts;
module.exports.addPost = addPost;
