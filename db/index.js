require('dotenv').config();
const {Client, Pool} = require('pg');


const client = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


client
    .connect()
    .then(() => console.log('connected'))
    .catch((err) => console.error('connection error', err.stack));


const testing = () => {
  return client.query(`select * from events`);
};

const test2 = (userID) => {
  return client.query(`select event_id from user_event where attendee_id=${userID}`);
};

const selectLangs=(userID)=>{
  return client.query(`
  select ll.id, ll.language_name
  from user_language ul,languages ll
  where ul.user_id=${userID} and ul.lang_id=ll.id
  `);
};

const selectJargons=(userID)=>{
  return client.query(`
  select ll.id, ll.language_name
  from user_language ul,languages ll
  where ul.user_id=${userID} and ul.lang_id=ll.id
  `);
};

const allLangs=()=>{
  return client.query(`select * from languages limit 15`);
};

const allJargons=()=>{
  return client.query(`select * from jargons limit 15`);
};


module.exports = {
  testing,
  test2,
  selectLangs,
  selectJargons,
  allLangs,
  allJargons,
};


module.exports.client = client;
