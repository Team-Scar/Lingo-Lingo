const {queryPosts} = require('../../db/controllers/forums.js');
const {filterLanguage} = require('../../db/controllers/forums.js');
const {filterJargon} = require('../../db/controllers/forums.js');
const {filterBoth} = require('../../db/controllers/forums.js');
const {submitPost} = require('../../db/controllers/forums.js');
const {upvotePost} = require('../../db/controllers/forums.js');
const {downvotePost} = require('../../db/controllers/forums.js');
const {queryPost} = require('../../db/controllers/forums.js');
const {queryResponses} = require('../../db/controllers/forums.js');
const {getUserName} = require('../../db/controllers/forums.js');
const {getLanguages} = require('../../db/controllers/forums.js');
const {getJargons} = require('../../db/controllers/forums.js');
const {getProfile} = require('../../db/controllers/forums.js');
const {getUserLanguages} = require('../../db/controllers/forums.js');
const {getUserJargons} = require('../../db/controllers/forums.js');
const {getLanguageId} = require('../../db/controllers/forums.js');
const {getJargonId} = require('../../db/controllers/forums.js');
const {submitResponse} = require('../../db/controllers/forums.js');

const languages = (req, res) => {
  getLanguages()
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        res.send(err);
      });
};

const userLanguages = (req, res) => {
  getUserLanguages(req.body.id)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        res.send(err);
      });
};

const jargons = (req, res) => {
  getJargons()
      .then((results) => res.send(results.rows))
      .catch((err) => res.send(err));
};

const userJargons = (req, res) => {
  getUserJargons(req.body.id)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        res.send(err);
      });
};

const profile = (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  getProfile(id)
      .then((results) => res.send(results.rows[0]))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
};

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
  submitPost(req.body.postObject)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log(err);
        res.send('upload failed');
      });
};

const languageId = (req, res) => {
  getLanguageId(req.body.language)
      .then((results) => {
        res.send(results.rows[0]);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
};

const jargonId = (req, res) => {
  getJargonId(req.body.jargon)
      .then((results) => {
        res.send(results.rows[0]);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
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

const getPost = (req, res) => {
  queryPost(req.params.postID)
      .then((results) => {
        res.send(results.rows);
      });
};

const getResponses = (req, res) => {
  queryResponses(req.params.postID)
      .then((results) => {
        res.send(results.rows);
      });
};

const addResponse = (req, res) => {
  console.log('reqBody', req.body);
  submitResponse(req.body.responseObj)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log(err);
        res.send('response upload failed');
      });
};

const getName = (req, res) => {
  getUserName(req.body.id).then((res) => {
    console.log(res);
  });
};

module.exports.languages = languages;
module.exports.jargons = jargons;
module.exports.profile = profile;
module.exports.userLanguages = userLanguages;
module.exports.userJargons = userJargons;
module.exports.getPosts = getPosts;
module.exports.filtered = filtered;
module.exports.addPost = addPost;
module.exports.upvote = upvote;
module.exports.downvote = downvote;
module.exports.getPost = getPost;
module.exports.getResponses = getResponses;
module.exports.getName = getName;
module.exports.languageId = languageId;
module.exports.jargonId = jargonId;
module.exports.addResponse = addResponse;
