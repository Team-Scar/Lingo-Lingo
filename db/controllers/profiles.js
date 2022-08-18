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
