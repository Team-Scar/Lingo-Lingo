const db = require('../../db/controllers/profiles.js');

const getUserProfile = (req, res) => {
  db.getProfile(req.params.userID).then((result) => {
    res.status(200).json(result.rows[0]);
  });
};

const addUser = (req, res) => {
  console.log(req.body);
  db.addConnect(req.body.obj).then(() => {
    res.status(201);
  });
};

module.exports = {
  getUserProfile,
  addUser,
};
