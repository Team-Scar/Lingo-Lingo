import React, {useState, useEffect} from 'react';
// import Sidebar from '../sidebar/Sidebar.jsx';
import Modal from '..//Modal/Modal.jsx';
import MfnBtn from '..//mfn_btn/MfnBtn.jsx';
import Cards from './Cards.jsx';
import './_forums.scss';
const axios = require('axios');

import forumStore from './_forumState.js';
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

  if (fetched === false) {
    axios.get('http://localhost:3005/posts')
        .then((results) => {
          loadPosts(results.data);
          setFetched();
        });
    axios.get('http://localhost:3005/languages')
        .then((results) => {
          console.log(results);
        });
    axios.get('http://localhost:3005/jargons')
        .then((results) => {
          console.log(results);
        });
  }

  const handleClick = (e) => {
    console.log(e);
    console.log(e.target.className);
    const filterArr = [];
    for (const key in filter) {
      if (filter[key]) {
        filterArr.push(key);
      }
    }
    console.log(filter);
  };

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
    console.log(userId);
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
    console.log('languages:', languageMap);
    console.log('jargons:', jargonMap);

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
      console.log('making filtered request');
      axios.get('http://localhost:3005/posts/filter', {params: params})
          .then((res) => {
            console.log(res.data);
            loadPosts(res.data);
          });
    } else {
      axios.get('http://localhost:3005/posts')
          .then((res) => {
            console.log(res.data);
            loadPosts(res.data);
          });
    }
  }, [filter]);

  const Form = () => {
    return (<form style={{display: 'grid'}}>
      Submit your post
      <div>
        Title:
        <input></input>
      </div>
      <div>
        Content:
        <textarea></textarea>
      </div>
      <div>
        Photo url:
        <input></input>
      </div>
      <button>Submit</button>
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
