// const router = require('express').Router();

// router.get('/profile/:userID', controllers.profiles.getUserProfile);

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/profiles.js');

router.get('/profile/:userID', controllers.getUserProfile);
router.post('/profile/connections', controllers.addUser);

router.put('/profile/edit', controllers.editProfile);

module.exports = router;
