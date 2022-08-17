const forums = require('./forums.js');

module.exports.userAuth = require('./userAuth.js');

module.exports.getPosts = forums.getPosts;
module.exports.getFilteredPosts = forums.getFilteredPosts;
module.exports.addPost = forums.addPost;
module.exports.upvote = forums.upvote;
module.exports.downvote = forums.downvote;
