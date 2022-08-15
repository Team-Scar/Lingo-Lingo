const express = require('express');
const router = express.Router();
const controllers = require('../controllers/events.js');

router.get('/allEvents', controllers.getAllEvents);
router.get('/attendEvents/:userID', controllers.getAttendEvents);
router.get('/allLanguages', controllers.getAllLanguages);
router.get('/allJargons', controllers.getAllJargons);
// //get an answer
// router.get("/:questions_id/answers", controllers.getLiveChat)

module.exports = router;
