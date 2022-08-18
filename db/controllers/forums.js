const {client} = require('../index.js');

module.exports.getLanguages = () => {
  return client.query(`
    select language_name from languages
  `);
};

module.exports.getJargons = () => {
  return client.query(`
    select jargon_name from jargons
  `);
};

module.exports.getProfile = (id) => {
  return client.query(`
    select * from users where id = ${id}
  `);
};

module.exports.getUserLanguages = (id) => {
  return client.query(`
    select ul.user_id, l.language_name
    from user_language ul, languages l
    where ul.user_id = ${id} and ul.lang_id = l.id
  `);
};

module.exports.getUserJargons = (id) => {
  return client.query(`
    select uj.user_id, j.jargon_name
    from user_jargon uj, jargons j
    where uj.user_id = ${id} and uj.jargon_id = j.id
  `);
};

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

module.exports.filterLanguage = (filter) => {
  console.log('filter:', filter);
  let filters = `(`;
  if (Array.isArray(filter)) {
    filter.map((choice, x) => {
      filters+=`'` + choice + `'`;
      if (x !== filter.length-1) {
        filters += ', ';
      }
    });
    filters += ')';
  } else {
    filters = `('` + filter + `')`;
  }
  console.log('filters:', filters);
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
  and l.language_name in ${filters}
  order by p.timestamp desc
  `,
  );
};

module.exports.filterJargon = (filter) => {
  console.log('filter:', filter);
  let filters = `(`;
  if (Array.isArray(filter)) {
    filter.map((choice, x) => {
      filters+=`'` + choice + `'`;
      if (x !== filter.length-1) {
        filters += ', ';
      }
    });
    filters += ')';
  } else {
    filters = `('` + filter + `')`;
  }
  console.log('filters:', filters);
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
  and j.jargon_name in ${filters}
  order by p.timestamp desc
  `,
  );
};

module.exports.filterBoth = (language, jargon) => {
  let languages = '(';
  let jargons = '(';

  if (Array.isArray(language)) {
    language.map((choice, x) => {
      languages +=`'` + choice + `'`;
      if (x !== language.length-1) {
        languages += ', ';
      }
    });
    languages += ')';
  } else {
    languages = `('` + language + `')`;
  }

  if (Array.isArray(jargon)) {
    jargon.map((choice, x) => {
      jargons +=`'` + choice + `'`;
      if (x !== jargon.length-1) {
        jargons += ', ';
      }
    });
    jargons += ')';
  } else {
    jargons = `('` + jargon + `')`;
  }

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
  and l.language_name in ${languages} and j.jargon_name in ${jargons}
  order by p.timestamp desc
  `,
  );

  console.log(languages, jargons);
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

module.exports.getLanguageId = (language) => {
  console.log(language);
  const lang = `'` + language + `'`;
  return client.query(`
    select * from languages where language_name=${lang}
  `);
};

module.exports.getJargonId = (jargon) => {
  const jarg = `'` + jargon + `'`;
  return client.query(`
    select * from jargons where jargon_name=${jarg}
  `);
};


module.exports.upvotePost = (id) => {
  const text = `update posts set vote = vote + 1 where id=$1`;
  const values = [id];
  console.log(id);
  return client.query(
      text, values,
  );
};

module.exports.downvotePost = (id) => {
  const text = `update posts set vote = vote - 1 where id=$1`;
  const values = [id];
  console.log(id);
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
      order by r.timestamp
      `, [postID]);
};

module.exports.getUserName = (id) => {
  const text = `SELECT username FROM users WHERE id = $1`;
  const values = [id];
  console.log(id);
  return client.query(
      text, values,
  );
};
