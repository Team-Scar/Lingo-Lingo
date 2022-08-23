const {client} = require('../index.js');

module.exports.allEvents = () => {
  return client.query(`select * from events`);
};

module.exports.selectEvents = (userID) => {
  return client.query(`select event_id from user_event where attendee_id=${userID}`);
};

module.exports.selectLangs = (userID) => {
  return client.query(`
  select ll.id, ll.language_name
  from user_language ul,languages ll
  where ul.user_id=${userID} and ul.lang_id=ll.id
  `);
};

module.exports.selectJargons = (userID) => {
  return client.query(`
  select ll.id, ll.language_name
  from user_language ul,languages ll
  where ul.user_id=${userID} and ul.lang_id=ll.id
  `);
};

module.exports.allLangs = () => {
  return client.query(`select * from languages`);
};

module.exports.allJargons = () => {
  return client.query(`select * from jargons`);
};

module.exports.addEvent = (userID, newEvent) => {
  return client.query(`
  with ins as (
    select id from languages where language_name='${newEvent.language}'
  ),ins2 as (
    select id from jargons where jargon_name='${newEvent.jargon}'
  ),ins3 as(
    insert into events(location,startTime,endTime,photo,description,user_id,lang_id,jargon_id)
    select '${newEvent.location}','${newEvent.start}','${newEvent.end}','${newEvent.photo}','${newEvent.description}',${userID}, ins.id,ins2.id from ins,ins2
    returning id as eventID
  )
  insert into user_event(event_id,attendee_id)
  select eventID, ${userID}
  from ins3
    `);
};

module.exports.removeEvent = (eventID) => {
  return client.query(`delete from user_event u where u.event_id=${eventID}`).then(() => {
    client.query(`delete from events e where e.id=${eventID}`);
  });

  // return client.query(`with del as (
  //   delete from user_event u where u.event_id=${eventID}
  // )
  // delete from events e where e.id=${eventID}`);
};

module.exports.updateAttend = (eventID, userID) => {
  return client.query(`delete from user_event where event_id=${eventID} and attendee_id=${userID}`);
};

module.exports.addAttend = (eventID, userID) => {
  return client.query(`insert into user_event (event_id,attendee_id)
  values (${eventID},${userID})`);
};
