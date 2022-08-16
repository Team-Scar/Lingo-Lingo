const db = require('../../db');
const path = require('path');

module.exports = {
  signUpGet: async (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  },
  signIn: async (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  },
  signUpPost: async (req, res) => {
    console.log(req.body);
    const {uid, email} = req.body;
    const query = 'insert into users (uid, email) values ($1, $2)';
    try {
      await db.query(query, [uid, email]);
      res.status(201).send('posted');
    } catch (e) {
      console.log('err in store in db', e);
    }
  },
  createAccount: async (req, res) => {
    console.log(req.body);
    res.status(201).send('created');
  },
  getAllLanguages: async (req, res) => {
    try {
      const query = `select json_agg(l)
      from (select language_name from languages limit 15)l`;
      const data = await db.query(query);
      res.status(200).send(data.rows[0].json_agg);
    } catch (e) {
      console.log('err in fetching languages in db', e);
    }
  },
  getAllJargons: async (req, res) => {
    try {
      const query = `select json_agg(j)
      from (select jargon_name from jargons limit 15)j`;
      const data = await db.query(query);
      res.status(200).send(data.rows[0].json_agg);
    } catch (e) {
      console.log('err in fetching jargons in db', e);
    }
  }
};
