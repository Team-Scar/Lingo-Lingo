const forums = require('./forums.js');

module.exports.userAuth = require('./userAuth.js');

module.exports.getPosts = forums.getPosts;
module.exports.filtered = forums.filtered;
module.exports.addPost = forums.addPost;
module.exports.upvote = forums.upvote;
module.exports.downvote = forums.downvote;
module.exports.getPost = forums.getPost;
module.exports.getResponses = forums.getResponses;
