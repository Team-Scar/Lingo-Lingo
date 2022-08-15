const {Client} = require('pg');


const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

client
    .connect()
    .then(() => console.log(`Connected at Port ${port}`))
    .catch(() => console.error(`DB Connection error`, err.stack));

module.exports = {
  client,
};
