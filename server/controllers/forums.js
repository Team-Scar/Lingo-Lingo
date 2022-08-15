const {queryPosts} = require('../../db/controllers/forums.js');

const getPosts = (req, res) => {
  // console.log(req);
  queryPosts()
      .then((results) => {
        res.send(results.rows);
      });
};

// export default getPosts;

module.exports.getPosts = getPosts;
