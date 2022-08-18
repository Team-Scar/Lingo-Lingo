DROP DATABASE IF EXISTS lingo;
CREATE DATABASE lingo;

\c lingo;


-- USER --
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid VARCHAR(500),
  name VARCHAR(500) ,
  username VARCHAR(500),
  email VARCHAR(500) NOT NULL,
  profile_photo TEXT,
  bio TEXT,
  login BOOLEAN DEFAULT FALSE
);

CREATE TABLE languages (
  id SERIAL PRIMARY KEY,
  language_name VARCHAR(500) NOT NULL
);

CREATE TABLE jargons (
  id SERIAL PRIMARY KEY,
  jargon_name VARCHAR(500) NOT NULL
);

CREATE TABLE user_language (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  lang_id INTEGER NOT NULL,
  proficiency SMALLINT,
  teacher BOOLEAN,
  student BOOLEAN,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (lang_id) REFERENCES languages (id)
);

CREATE TABLE user_jargon (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  jargon_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (jargon_id) REFERENCES jargons (id)
);

CREATE TABLE connections (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  friend_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (friend_id) REFERENCES users (id)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  location VARCHAR(500),
  startTime TIMESTAMPTZ DEFAULT NOW(),
  endTime TIMESTAMPTZ DEFAULT NOW(),
  description Text,
  photo TEXT,
  user_id INTEGER NOT NULL,
  lang_id INTEGER NOT NULL,
  jargon_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (lang_id) REFERENCES languages (id),
  FOREIGN KEY (jargon_id) REFERENCES jargons (id)
);

CREATE TABLE user_event (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  attendee_id INTEGER NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events (id),
  FOREIGN KEY (attendee_id) REFERENCES users (id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  photo TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  vote INTEGER DEFAULT 0,
  user_id INTEGER NOT NULL,
  lang_id INTEGER NOT NULL,
  jargon_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (lang_id) REFERENCES languages (id),
  FOREIGN KEY (jargon_id) REFERENCES jargons (id)
);

CREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  response_to_id INTEGER DEFAULT NULL,
  content TEXT NOT NULL,
  photo TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  vote INTEGER DEFAULT 0,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES Posts (id)
);

CREATE TABLE chatrooms (
  id SERIAL PRIMARY KEY,
  room_name VARCHAR(255),
  creator_id INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE chatroom_user (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  chatroom_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (chatroom_id) REFERENCES chatrooms (id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content Text,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_id INTEGER NOT NULL,
  chatroom_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (chatroom_id) REFERENCES chatrooms (id)
);

CREATE TABLE post_vote (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  vote INTEGER NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE response_vote (
  id SERIAL PRIMARY KEY,
  response_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  vote INTEGER NOT NULL,
  FOREIGN KEY (response_id) REFERENCES responses (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- create table jarggnames as
-- select a.*, b.jargon_name
-- from user_jargon a, jargons b
-- where a.jargon_id = b.id;

-- create table langnames as
-- select a.*, b.language_name
-- from user_language a, languages b
-- where a.lang_id = b.id;

-- DROP TABLE IF EXISTS `review`;

copy languages FROM '/home/ubuntu/lingo_data - languages.csv' DELIMITER ',' CSV HEADER;
copy jargons FROM '/home/ubuntu/lingo_data - jargons.csv' DELIMITER ',' CSV HEADER;
copy user_language FROM '/home/ubuntu/lingo_data - user_language.csv' DELIMITER ',' CSV HEADER;
copy user_jargon FROM '/home/ubuntu/lingo_data - user_jargon.csv' DELIMITER ',' CSV HEADER;
copy users FROM '/home/ubuntu/lingo_data - users.csv' DELIMITER ',' CSV HEADER;
copy connections FROM '/home/ubuntu/lingo_data - connections.csv' DELIMITER ',' CSV HEADER;
copy events FROM '/home/ubuntu/lingo_data - events.csv' DELIMITER ',' CSV HEADER;
copy user_event FROM '/home/ubuntu/lingo_data - user_event.csv' DELIMITER ',' CSV HEADER;
copy posts FROM '/home/ubuntu/lingo_data - posts.csv' DELIMITER ',' CSV HEADER;
copy responses FROM '/home/ubuntu/lingo_data - responses.csv' DELIMITER ',' CSV HEADER;
copy messages FROM '/home/ubuntu/lingo_data - messages.csv' DELIMITER ',' CSV HEADER;
copy chatrooms FROM '/home/ubuntu/lingo_data - chatrooms.csv' DELIMITER ',' CSV HEADER;
copy chatroom_user FROM '/home/ubuntu/lingo_data - chatroom_user.csv' DELIMITER ',' CSV HEADER;
copy post_vote FROM '/home/ubuntu/lingo_data - post_vote.csv' DELIMITER ',' CSV HEADER;
copy response_vote FROM '/home/ubuntu/lingo_data - response_vote.csv' DELIMITER ',' CSV HEADER;


-- not sure if we need this
SELECT setval(pg_get_serial_sequence('languages', 'id'), (SELECT MAX(id) FROM languages)+1);
SELECT setval(pg_get_serial_sequence('jargons', 'id'), (SELECT MAX(id) FROM jargons)+1);
SELECT setval(pg_get_serial_sequence('user_language', 'id'), (SELECT MAX(id) FROM user_language)+1);
SELECT setval(pg_get_serial_sequence('user_jargon', 'id'), (SELECT MAX(id) FROM user_jargon)+1);
SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users)+1);
SELECT setval(pg_get_serial_sequence('connections', 'id'), (SELECT MAX(id) FROM connections)+1);
SELECT setval(pg_get_serial_sequence('events', 'id'), (SELECT MAX(id) FROM events)+1);
SELECT setval(pg_get_serial_sequence('user_event', 'id'), (SELECT MAX(id) FROM user_event)+1);
SELECT setval(pg_get_serial_sequence('posts', 'id'), (SELECT MAX(id) FROM posts)+1);
SELECT setval(pg_get_serial_sequence('responses', 'id'), (SELECT MAX(id) FROM responses)+1);
SELECT setval(pg_get_serial_sequence('messages', 'id'), (SELECT MAX(id) FROM messages)+1);
SELECT setval(pg_get_serial_sequence('chatroom_user', 'id'), (SELECT MAX(id) FROM chatroom_user)+1);
SELECT setval(pg_get_serial_sequence('chatrooms', 'id'), (SELECT MAX(id) FROM chatrooms)+1);
SELECT setval(pg_get_serial_sequence('post_vote', 'id'), (SELECT MAX(id) FROM post_vote)+1);
SELECT setval(pg_get_serial_sequence('response_vote', 'id'), (SELECT MAX(id) FROM response_vote)+1);



create index user_lang_idx on user_language (user_id,lang_id);

create index user_jargon_idx on user_jargon (user_id,jargon_id);

create index connectioninfo_idx on connections (user_id,friend_id);

create index eveninfo_idx on events (user_id,lang_id,jargon_id);

create index user_event_idx on user_event (event_id,attendee_id);

create index postinfo_idx on posts (user_id,lang_id,jargon_id);

create index responseinfo_idx on responses (user_id,post_id,response_to_id);

create index chatroominfo_idx on chatrooms (creator_id);

create index chatroom_user_idx on chatroom_user (user_id,chatroom_id);

create index messageinfo_idx on messages (user_id,chatroom_id);

create index postvote_idx on post_vote (post_id,user_id);

create index responsevote_idx on response_vote (response_id,user_id);