const {client} = require('../../db');


module.exports = {
  signUpPost: async (req, res) => {
    console.log('sign up post!!!');
    const {uid, email} = req.body;
    const query = 'insert into users (uid, email) values ($1, $2)';
    try {
      await client.query(query, [uid, email]);
      res.status(201).send('posted');
    } catch (e) {
      console.log('err in store in db', e);
    }
  },
  // {
  //   email: 'yecic56597@yasiok.com',
  //   name: 'test',
  //   username: 'test222',
  //   profile_photo: 'http://res.cloudinary.com/may6688/image/upload/v1660703862/LingoLingo/n12coqdaopqdcu4zmql7.jpg',
  //   bio: 'dggsdfgsdfgsdfg',
    // user_language: [
    //   { language: 'Hindi', role: 'teacher', proficiency: '5' },
    //   { language: 'Portuguese', role: 'student', proficiency: '1' },
    //   { language: 'Bengali', role: 'both', proficiency: '4' }
    // ],
  //   user_jargon: [ 'Food and Drinks', 'Clothing and Fashion' ]
  // }
  createAccount: async (req, res) => {
    console.log('create account post!!!');
    // client.query("SELECT setval(pg_get_serial_sequence('user_jargon', 'id'), (SELECT MAX(id) FROM user_jargon)+1)")
    // client.query("SELECT setval(pg_get_serial_sequence('user_language', 'id'), (SELECT MAX(id) FROM user_language)+1)")
    const {email, name, username, profile_photo, bio, user_jargon, user_language} = req.body;
    const findUserIdQuery = 'select users.id from users where users.email = $1';
    const userQuery = `update users
    set name = $1, username = $2, profile_photo = $3, bio = $4, login = true
    where users.email = $5`;

    try {
      // find userID
      const result = await client.query(findUserIdQuery, [email]);
      const userId = result.rows[0].id;

      // store users into db
      await client.query(userQuery, [name, username, profile_photo, bio, email]);

      // store user_jargon into db
      for (let jargon of JSON.parse(JSON.stringify(user_jargon))) {
        const jargonResult = await client.query('select jargons.id from jargons where jargons.jargon_name = $1', [jargon]);
        const userJargonQuery = 'insert into user_jargon (user_id, jargon_id) values ($1, $2)';
        await client.query(userJargonQuery, [userId, jargonResult.rows[0].id]);
        console.log('jargon info is', jargonResult);
      }

      // store user_language into db
      const userLanguages = JSON.parse(JSON.stringify(user_language));
      for (let key in userLanguages) {
        let teacher = true;
        let student = true;
        const lang = userLanguages[key];
        const {language, role, proficiency} = lang;
        const langResult = await client.query('select languages.id from languages where languages.language_name = $1', [language])
       if(role === 'teacher') student = false;
       if(role === 'student') teacher = false;
       const userJargonQuery = 'insert into user_language (user_id, lang_id, proficiency, teacher, student) values ($1, $2, $3, $4, $5)';
       await client.query(userJargonQuery, [userId, langResult.rows[0].id, proficiency, teacher, student]);
      }
    } catch (e) {
      console.log('err in store data in db', e);
    }
    res.status(201).send('created');
  },
  getAllLanguages: async (req, res) => {
    console.log('get all languages!!!');
    try {
      const query = `select json_agg(l)
      from (select language_name from languages limit 15)l`;
      const data = await client.query(query);
      res.status(200).send(data.rows[0].json_agg);
    } catch (e) {
      console.log('err in fetching languages in db', e);
    }
  },
  getAllJargons: async (req, res) => {
    console.log('get all jargons!!!');
    try {
      const query = `select json_agg(j)
      from (select jargon_name from jargons limit 15)j`;
      const data = await client.query(query);
      res.status(200).send(data.rows[0].json_agg);
    } catch (e) {
      console.log('err in fetching jargons in db', e);
    }
  },
  getUserId: async (req, res) => {
    console.log('get one id!!!');
    const {email} = req.query;
    try {
      const query = 'select users.id from users where users.email = $1';
      const data = await client.query(query, [email]);
      // console.log(data.rows[0].id)
      res.status(200).send(data);
    } catch (e) {
      console.log('err in fetch user ID', e);
    }
  }
};
