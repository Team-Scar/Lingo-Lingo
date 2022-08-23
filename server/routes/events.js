const express = require('express');
require('dotenv');
const router = express.Router();
const controllers = require('../controllers/events.js');
const {google}=require('googleapis');

router.get('/allEvents', controllers.getAllEvents);
router.get('/attendEvents/:userID', controllers.getAttendEvents);
router.get('/allLanguagess', controllers.getAllLanguages);
router.get('/allJargonss', controllers.getAllJargons);
router.get('/geoLocation', controllers.getLocation);
router.post('/addEvent/:userID', controllers.addEvent);
router.delete('/removeEvent/:eventID', controllers.removeEvent);
router.delete('/updateAttend/:eventID/:userID', controllers.updateAttend);

router.post('/addAttend/:eventID/:userID', controllers.addAttend);
// //get an answer
// router.get("/:questions_id/answers", controllers.getLiveChat)

module.exports = router;
