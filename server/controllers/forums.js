const {queryPosts} = require('../../db/controllers/forums.js');
const {filterLanguage} = require('../../db/controllers/forums.js');
const {filterJargon} = require('../../db/controllers/forums.js');
const {filterBoth} = require('../../db/controllers/forums.js');
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

const filtered = (req, res) => {
  console.log(req.query);
  let languages;
  let jargons;
  // if languages, create language filter
  if (req.query.languages) {
    if (req.query.languages.includes('&')) {
      languages = req.query.languages.split('&');
    } else {
      languages = req.query.languages;
    }
  }
  // if jargons, create jargon filter
  if (req.query.jargons) {
    if (req.query.jargons.includes('&')) {
      jargons = req.query.jargons.split('&');
    } else {
      jargons = req.query.jargons;
    }
  }
  // if both filters are created, query with both filters
  if (languages && jargons) {
    filterBoth(languages, jargons)
        .then((results) => {
          console.log(results.rows);
          res.send(results.rows);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
  } else if (languages) {
    filterLanguage(languages)
        .then((results) => {
          console.log(results.rows);
          res.send(results.rows);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
  } else if (jargons) {
    filterJargon(jargons)
        .then((results) => {
          console.log(results.rows);
          res.send(results.rows);
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
  }
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
module.exports.filtered = filtered;
module.exports.addPost = addPost;
module.exports.upvote = upvote;
module.exports.downvote = downvote;
