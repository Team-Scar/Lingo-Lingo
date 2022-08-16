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
module.exports = {
  getAllEvents,
  getAttendEvents,
  getAllLanguages,
  getAllJargons,
  addEvent,
};
