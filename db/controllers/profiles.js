const {client} = require('../index.js');

module.exports.getProfile = (userID) => {
  return client.query(`SELECT
  users.name AS name,
  users.username AS username,
  users.profile_photo as photo,
  users.bio as bio,
        ( SELECT json_agg(item)
          FROM ( SELECT
            ll.language_name as language,
            ul.proficiency
            FROM user_language ul, languages ll
            WHERE teacher = true AND ul.user_id = users.id and ul.lang_id=ll.id
              ) item
            ) AS speaks,

            (select json_agg(language_name)
              from user_language ul,languages ll
              where student = true AND ul.user_id = users.id and ul.lang_id=ll.id) as wants,

              (select json_agg(jargon_name)
              from user_jargon uj,jargons jj
              where uj.user_id = users.id and uj.jargon_id=jj.id) as interests
  FROM users
  WHERE users.id = ${userID}`);
};


module.exports.addConnect = ({userID, friendID}) => {
  return client.query(`insert into connections (user_id, friend_id)
  values (${userID},${friendID})`);
};

// module.exports.editUser = ({id, name, username, profile_photo, bio, user_jargon, user_language} ) => {
//   return client.query(`update users
//     set name = $1, username = $2, profile_photo = $3, bio = $4, login = true
//     where users.email = $5`;)
// }

// const {email, name, username, profile_photo, bio, user_jargon, user_language} = req.body;
//     const findUserIdQuery = 'select users.id from users where users.email = $1';
//     const userQuery = `update users
//     set name = $1, username = $2, profile_photo = $3, bio = $4, login = true
//     where users.email = $5`;

//     try {
//       // find userID
//       const result = await client.query(findUserIdQuery, [email]);
//       const userId = result.rows[0].id;

//       // store users into db
//       await client.query(userQuery, [name, username, profile_photo, bio, email]);

//       // store user_jargon into db
//       for (let jargon of JSON.parse(JSON.stringify(user_jargon))) {
//         const jargonResult = await client.query('select jargons.id from jargons where jargons.jargon_name = $1', [jargon]);
//         const userJargonQuery = 'insert into user_jargon (user_id, jargon_id) values ($1, $2)';
//         await client.query(userJargonQuery, [userId, jargonResult.rows[0].id]);
//       }

//       // store user_language into db
//       const userLanguages = JSON.parse(JSON.stringify(user_language));
//       for (let key in userLanguages) {
//         let teacher = true;
//         let student = true;
//         const lang = userLanguages[key];
//         const {language, role, proficiency} = lang;
//         const langResult = await client.query('select languages.id from languages where languages.language_name = $1', [language])
//        if(role === 'teacher') student = false;
//        if(role === 'student') teacher = false;
//        const userJargonQuery = 'insert into user_language (user_id, lang_id, proficiency, teacher, student) values ($1, $2, $3, $4, $5)';
//        await client.query(userJargonQuery, [userId, langResult.rows[0].id, proficiency, teacher, student]);
//       }
//     } catch (e) {
//       console.log('err in store data in db', e);
//     }
//     res.status(201).send('created');
//   },
