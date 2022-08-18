import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from '..//Modal/Modal.jsx';
import MfnBtn from '..//mfn_btn/MfnBtn.jsx';
import Cards from './Cards.jsx';
import './_forums.scss';
const axios = require('axios');

import forumStore from './_forumState.js';
import postStore from '../forum_details/_postState.js';
import globalStore from '../../zustand.js';
const ForumView = () => {
  const posts = forumStore((state) => state.posts);
  const fetched = forumStore((state) => state.fetched);
  const setFetched = forumStore((state) => state.setFetched);
  const loadPosts = forumStore((state) => state.loadPosts);
  const filter = globalStore((state) => state.currentFilters);
  const filterLang = globalStore((state) => state.userLanguages);
  const filterTopics = globalStore((state) => state.userTopics);
  const userId = globalStore((state) => state.userId);
  const setLanguages = globalStore((state) => state.setLanguages);
  const setJargon = globalStore((state) => state.setJargon);
  const user = globalStore((state) => state.user);
  const userLanguages = globalStore((state) => state.userLanguages);
  const userTopics = globalStore((state) => state.userTopics);
  const allLanguages = globalStore((state) => state.allLanguages);
  const allJargon = globalStore((state) => state.allJargon);
  const setUser = globalStore((state) => state.setUser);
  const updateUserName = globalStore((state) => state.updateUserName);
  const setUserLanguages = globalStore((state) => state.setUserLanguages);
  const setUserTopics = globalStore((state) => state.setUserTopics);
  const resetFetched = postStore((state) => state.resetFetched);

  resetFetched();

  if (fetched === false) {
    const languages = [];
    const jargons = [];
    axios.get('http://localhost:3005/posts')
        .then((results) => {
          loadPosts(results.data);
          setFetched();
          axios.get('http://localhost:3005/languages')
              .then((results) => {
                for (let x = 0; x < results.data.length; x++) {
                  const lang = results.data[x];
                  languages.push(lang['language_name']);
                }
                setLanguages(languages);
                axios.get('http://localhost:3005/jargons')
                    .then((results) => {
                      // console.log(results.data);
                      for (let x = 0; x < results.data.length; x++) {
                        const jarg = results.data[x];
                        jargons.push(jarg['jargon_name']);
                      }
                      setJargon(jargons);
                    });
              });
        });
  }
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e);
    console.log(e.target.getAttribute('name'));
    const id = e.target.getAttribute('name');

    // setCurrentPost(Number(id), () => {});

    // navigate('/discussions');
  };

  useEffect(() => {
    axios.post('http://localhost:3005/profile', {'id': userId})
        .then((results) => {
          // console.log(results.data);
          setUser(results.data);
          updateUserName(results.data.username);
          axios.post('http://localhost:3005/languages', {'id': userId})
              .then((results) => {
                // console.log(results.data);
                const userLangs = [];
                for (let x = 0; x < results.data.length; x++) {
                  const lang = results.data[x];
                  userLangs.push(lang['language_name']);
                }
                setUserLanguages(userLangs);
                axios.post('http://localhost:3005/jargons', {'id': userId})
                    .then((results) => {
                      // console.log(results.data);
                      const userJargs = [];
                      for (let x = 0; x < results.data.length; x++) {
                        const jarg = results.data[x];
                        userJargs.push(jarg['jargon_name']);
                      }
                      setUserTopics(userJargs);
                    });
              });
        });
  }, user);

  useEffect(() => {
    // console.log('use effect');
    if (annyang) {
      const cards = document.getElementsByClassName('cardTitle');
      const titles = [];
      for (let x = 0; x < cards.length; x++) {
        const currentTitle = cards[x].innerHTML;
        titles.push(currentTitle);
      }
      const commands = {
        'hello': () => console.log('hello'),
      };
      titles.map((title) => {
        if (title !== 'Hello world' && title !== 'Hola Mundo') {
          commands[title] = () => (
            console.log(title),
            document.getElementById(title).click()
          );
        }
      });

      console.log(commands);
      annyang.addCommands(commands);
      annyang.start();
    }
  });

  useEffect(() => {
    const languageArr = [];
    const jargonArr = [];
    // console.log(userId);
    for (const key in filter) {
      if (filter[key] && filterLang.includes(key)) {
        languageArr.push(key);
      } else if (filter[key] && filterTopics.includes(key)) {
        jargonArr.push(key);
      }
    }
    let languageMap = '';
    let jargonMap = '';
    languageArr.map((lang, x) => {
      languageMap += lang;
      if (x !== languageArr.length-1) {
        languageMap += '&';
      }
    });

    jargonArr.map((jargon, x) => {
      jargonMap += jargon;
      if (x !== jargonArr.length - 1) {
        jargonMap += '&';
      }
    });
    // console.log('languages:', languageMap);
    // console.log('jargons:', jargonMap);

    // axios request
    const params = {};
    if (jargonMap.length > 3 && languageMap.length > 3) {
      params.languages = languageMap;
      params.jargons = jargonMap;
    } else if (languageMap.length > 3) {
      params.languages = languageMap;
    } else if (jargonMap.length > 3) {
      params.jargons = jargonMap;
    }
    if (Object.keys(params).length > 0) {
      // console.log('making filtered request');
      axios.get('http://localhost:3005/posts/filter', {params: params})
          .then((res) => {
            // console.log(res.data);
            loadPosts(res.data);
          });
    } else {
      axios.get('http://localhost:3005/posts')
          .then((res) => {
            // console.log(res.data);
            loadPosts(res.data);
          });
    }
  }, [filter]);

  const Form = () => {
    const postObject = {};
    const handleChange = (e) => {
      postObject[e.target.name] = e.target.value;
      // console.log(postObject);
    };
    const handleClick = (e) => {
      e.preventDefault();
      const lang = document.getElementById('language').value;
      const jarg = document.getElementById('jargon').value;
      postObject['timestamp'] = new Date().toISOString();
      postObject['user'] = userId;
      postObject['vote'] = 1;

      axios.post('http://localhost:3005/language', {'language': lang})
          .then((result) => {
            postObject['language'] = result.data.id;
            axios.post('http://localhost:3005/jargon', {'jargon': jarg})
                .then((result) => {
                  postObject['jargon'] = result.data.id;
                  axios.post('http://localhost:3005/posts', {postObject})
                      // .then((result) => console.log(result.data))
                      .then(() => {
                        location.href = window.location.href;
                      });
                });
          });

      // postObject['language'] = allLanguages.indexOf(lang);
      // postObject['jargon'] = allJargon.indexOf(jarg);
    };
    return (<form className="submitPost">
      Submit your post
      <div>
        Title:
        <input name="title" onChange={handleChange}></input>
      </div>
      <div>
        Content:
        <textarea name="content" onChange={handleChange}></textarea>
      </div>
      <div>
        Photo url:
        <input name="photo" onChange={handleChange}></input>
      </div>
      <div>
        Submission language:
        <select name="language" id="language" onChange={handleChange}>
          {userLanguages.map((lang) => {
            return (
              <option value={lang}>{lang}</option>
            );
          })}
        </select>
      </div>
      <div>
        Submission jargon:
        <select name="jargon" id="jargon" onChange={handleChange}>
          {userTopics.map((topic) => {
            return (
              <option value={topic}>
                {topic}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={handleClick}>Submit</button>
    </form>
    );
  };

  return (
    <div className="forumView">
      <Modal children={Form()}/>
      <MfnBtn />

      {posts.map((post, x) => {
        return <Cards key={x + post} post={post} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default ForumView;


// let post = {
//   "title": 'Hello world',
//   "content": 'This is my first forum post!',
//   "photo": null,
//   "time": 'time',
//   "votes": 69,
//   "user": 'David',
//   "language": 'English',
//   "jargon": 'Sleep, Dreams, Nightmares'
// }

// title
// content
// photo
// time
// vote
// user
// language
// jargon (if applicable)
