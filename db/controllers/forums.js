const {pool} = require('../index.js');

module.exports.queryPosts = () => {
  return pool.query(`
  with responseCount as (
    select p.id, count(r.id)
    from posts p left outer join responses r on p.id=r.post_id
    group by p.id
    order by p.id
  )

  select
    p.id, p.title, p.content, p.photo, p.timestamp,
    p.vote, u.username, l.language_name, j.jargon_name, responseCount.count
    as responses
  from posts p, users u, languages l, jargons j, responseCount
  where u.id = p.user_id and p.lang_id = l.id
  and p.jargon_id = j.id and p.id = responseCount.id
  order by p.timestamp desc
  `,
  );
};

module.exports.addPosts = () => {

};
