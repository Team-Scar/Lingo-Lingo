require('dotenv').config();
const {Client, Pool} = require('pg');




const client = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


client
    .connect()
<<<<<<< HEAD
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


module.exports = client;

=======
    .then(() => console.log(`Connected at Port ${port}`))
    .catch(() => console.error(`DB Connection error`, err.stack));
=======
    .then(() => console.log(`Connected at Port ${process.env.DB_PORT}`))
    .catch((err) => console.error('DB Connection error', err.stack));
>>>>>>> 0875f5e (saved work on userprofile)
=======
    .then(() => console.log(`Connected at Port ${process.env.DB_PORT}`))
    .catch((err) => console.error('DB Connection error', err.stack));
>>>>>>> 0875f5e778176df62d6e243e2815e7218e26f3d4

module.exports = {
  client,
};
<<<<<<< HEAD
>>>>>>> ac1cdce (worked on profile)
=======
>>>>>>> 0875f5e778176df62d6e243e2815e7218e26f3d4
