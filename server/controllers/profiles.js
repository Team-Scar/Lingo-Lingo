const db = require('../../db/controllers/profiles.js');

const getUserProfile = (req, res) => {
  db.getProfile(req.params.userID).then((result) => {
    res.status(200).json(result.rows[0]);
  });
};

module.exports = {
  getUserProfile,
};
