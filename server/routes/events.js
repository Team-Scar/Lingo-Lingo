const express = require('express');
require('dotenv');
const router = express.Router();
const controllers = require('../controllers/events.js');
const {google}=require('googleapis');
GOOGLE_CLINET_ID='866655618285-5vbvalfp3mn5j9te2du9g54i5sd9ip1t.apps.googleusercontent.com';
GOOGLE_CLIENT_SECRET='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';
const oauth2Client=new google.auth.OAuth2(
    GOOGLE_CLINET_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000',
);

router.get('/allEvents', controllers.getAllEvents);
router.get('/attendEvents/:userID', controllers.getAttendEvents);
router.get('/allLanguagess', controllers.getAllLanguages);
router.get('/allJargonss', controllers.getAllJargons);
router.get('/geoLocation', controllers.getLocation);
router.post('/addEvent/:userID', controllers.addEvent);
router.delete('/removeEvent/:eventID', controllers.removeEvent);
router.delete('/updateAttend/:eventID/:userID', controllers.updateAttend);

const refreshToken='1//0fStJ1a03BJCJCgYIARAAGA8SNwF-L9IrvnlpZ2Ca544zkJPV2yE6pKKXBZHQUsgGJ-GNfeUqgAvFQ3Y5GEuIB-jUnzpovoEgnx0';// should be stroed in the database in reality
router.post('/create-tokens', async (req, res, next)=>{
  try {
    const {code}=req.body;
    const {tokens}=await oauth2Client.getToken(code);

    res.send(tokens);
  } catch (err) {
    next(err);
  }
});


router.post('/create-event', async (req, res, next)=>{
  try {
    console.log(req.body);
    const {description, location, startDateTime, endDateTime}=req.body;
    oauth2Client.setCredentials({refresh_token: refreshToken});
    const calendar=google.calendar('v3');
    const response=await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: description,
        location: location,
        colorId: '7',
        start: {
          dateTime: new Date(startDateTime),
        },
        end: {
          dateTime: new Date(endDateTime),
        },
      },
    });
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post('/addAttend/:eventID/:userID', controllers.addAttend);
// //get an answer
// router.get("/:questions_id/answers", controllers.getLiveChat)

module.exports = router;
