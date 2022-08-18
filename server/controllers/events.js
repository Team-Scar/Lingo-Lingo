require('dotenv').config();
const axios = require('axios');
const queries = require('../../db/controllers/events.js');

const getAllEvents = (req, res) => {
  console.log('here is the controller');
  queries.allEvents().then((result) => {
    res.json(result.rows);
  });
};

const getAttendEvents = (req, res) => {
  console.log('here is the controller');
  queries.selectEvents(req.params.userID).then((result) => {
    const array = result.rows.map((item) => {
      return item.event_id;
    });
    res.json(array);
  });
};

const getAllLanguages = (req, res) => {
  queries.allLangs().then((result) => {
    res.json(result.rows);
  });
};
const getAllJargons = (req, res) => {
  queries.allJargons().then((result) => {
    res.json(result.rows);
  });
};

const addEvent = (req, res) => {
  queries.addEvent(req.params.userID, req.body).then(() => {
    res.sendStatus(201);
  });
};

const removeEvent=(req, res)=>{
  queries.removeEvent(req.params.eventID).then(()=>{
    res.sendStatus(200);
  });
};
const updateAttend=(req, res)=>{
  queries.updateAttend(req.params.eventID, req.params.userID).then(()=>{
    res.sendStatus(200);
  });
};
const addAttend=(req, res)=>{
  console.log(req.params.eventID);
  console.log(req.params.userID);
  queries.addAttend(req.params.eventID, req.params.userID).then(()=>{
    res.sendStatus(200);
  });
};

const getLocation=(req, res)=>{
  console.log(req.query.address);
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: req.query.address,
      key: process.env.Google_API_KEY,
    },
  }).then((result) => {
    res.json(result.data.results[0].geometry.location);
  });
};

module.exports = {
  getAllEvents,
  getAttendEvents,
  getAllLanguages,
  getAllJargons,
  addEvent,
  removeEvent,
  updateAttend,
  addAttend,
  getLocation,
};
