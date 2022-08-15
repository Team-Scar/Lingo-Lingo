const {Pool} = require('pg');


const client = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


client
    .connect()
    .then(() => console.log(`Connected at Port ${process.env.DB_PORT}`))
    .catch((err) => console.error('DB Connection error', err.stack));

module.exports = {
  client,
};
