const forums = require('./forums.js');

module.exports.userAuth = require('./userAuth.js');


module.exports.languages = forums.languages;
module.exports.jargons = forums.jargons;
module.exports.profile = forums.profile;
module.exports.userLanguages = forums.userLanguages;
module.exports.userJargons = forums.userJargons;
module.exports.getPosts = forums.getPosts;
module.exports.filtered = forums.filtered;
module.exports.addPost = forums.addPost;
module.exports.upvote = forums.upvote;
module.exports.downvote = forums.downvote;
module.exports.getPost = forums.getPost;
module.exports.getResponses = forums.getResponses;
module.exports.languageId = forums.languageId;
module.exports.jargonId = forums.jargonId;
module.exports.addResponse = forums.addResponse;
