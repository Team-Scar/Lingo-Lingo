const {client} = require('../index.js');

module.exports.queryPosts = () => {
  return client.query(`
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

module.exports.submitPost = (post) => {
  console.log(post);
  const text = `insert into posts(title, content, photo, timestamp, vote,
    user_id, lang_id, jargon_id) values($1, $2, $3, $4, $5, $6, $7, $8)
    returning *`;
  const values = [post.title, post.content, post.photo, post.timestamp,
    post.vote, post.user, post.language, post.jargon];
  return client.query(
      text, values,
  );
};

module.exports.queryPost = (postID) => {
  return client.query(`
      select
        p.id, p.title, p.content, p.photo, p.timestamp,
        p.vote, u.username, l.language_name, j.jargon_name
      from posts p, users u, languages l, jargons j
      where u.id = p.user_id and p.lang_id = l.id
      and p.jargon_id = j.id and p.id = ($1)
      `, [postID]);
};

module.exports.queryResponses = (postID) => {
  return client.query(`
      select
        r.id, r.response_to_id, r.content, r.photo, r.timestamp,
        r.vote, u.username
      from responses r, users u
      where u.id = r.user_id and r.post_id = ($1)
      `, [postID]);
};
