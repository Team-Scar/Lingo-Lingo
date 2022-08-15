require('dotenv').config()
const {Client, Pool} = require('pg');


const client = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client
    .connect()
    .then(() => console.log('connected'))
    .catch((err) => console.error('connection error', err.stack));

module.exports = client;
