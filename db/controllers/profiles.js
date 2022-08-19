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
// createAccount: async (req, res) => {
module.exports.editUser = async ({id, name, username, profile_photo, bio, user_jargon, user_language} ) => {
  return client.query(`update users
    set name = ${name}, username = ${username}, profile_photo = ${profile_photo}, bio = ${bio}
    where users.id = ${id}`)
      .then( async () => {
        for (const jargon of JSON.parse(JSON.stringify(user_jargon))) {
          const jargonResult = await client.query('select jargons.id from jargons where jargons.jargon_name = $1', [jargon]);
          const userJargonQuery = 'update user_jargon set jargon_id = $1 where user_id = $2';
          await client.query(userJargonQuery, [jargonResult.rows[0].id, id]);
        }
      })
      .then( async () => {
        const userLanguages = JSON.parse(JSON.stringify(user_language));
        for (const key in userLanguages) {
          let teacher = true;
          let student = true;
          const lang = userLanguages[key];
          const {language, role, proficiency} = lang;
          const langResult = await client.query('select languages.id from languages where languages.language_name = $1', [language]);
          if (role === 'teacher') student = false;
          if (role === 'student') teacher = false;
          const userJargonQuery = 'update user_language set lang_id = $1, proficiency = $2, teacher = $3, student = $4 where user_id = $5';
          await client.query(userJargonQuery, [langResult.rows[0].id, proficiency, teacher, student, id]);
        }
      })
      .then(()=> {
        res.status(201).send('updated successfully');
      })
      .catch((err) => console.log(err));
};
