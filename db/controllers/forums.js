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
