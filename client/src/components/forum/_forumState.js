import create from 'zustand';
import {devtools} from 'zustand/middleware';

const useForumStore = ((set) => ({
  posts: [{
    'title': 'Hello world',
    'content': 'This is my first forum post!',
    'photo': null,
    'time': 'time ago',
    'votes': 69,
    'responses': 369,
    'user': 'David',
    'language': 'English',
    'jargon': 'Sleep, Dreams, Nightmares',
  }, {
    'title': 'Hola Mundo',
    'content': 'Esta es mi primera publicación en el foro.',
    'photo': null,
    'time': 'time ago',
    'votes': 69,
    'responses': 369,
    'user': 'Davíd',
    'language': 'Spanish',
    'jargon': 'Sleep, Dreams, Nightmares',
  }, {
    'title': 'Hello world',
    'content': 'This is my first forum post!',
    'photo': null,
    'time': 'time ago',
    'votes': 69,
    'responses': 369,
    'user': 'David',
    'language': 'English',
    'jargon': 'Sleep, Dreams, Nightmares',
  }, {
    'title': 'Hello world',
    'content': 'This is my first forum post!',
    'photo': null,
    'time': 'time ago',
    'votes': 69,
    'responses': 369,
    'user': 'David',
    'language': 'English',
    'jargon': 'Sleep, Dreams, Nightmares',
  }, {
    'title': 'Hello world',
    'content': 'This is my first forum post!',
    'photo': null,
    'time': 'time ago',
    'votes': 69,
    'responses': 369,
    'user': 'David',
    'language': 'English',
    'jargon': 'Sleep, Dreams, Nightmares',
  },
  {
    'title': 'Hello world',
    'content': 'This is my first forum post!',
    'photo': null,
    'time': 'time ago',
    'votes': 69,
    'responses': 369,
    'user': 'David',
    'language': 'English',
    'jargon': 'Sleep, Dreams, Nightmares',
  }],
  fetched: false,
  setFetched: () => set({fetched: true}),
  loadPosts: (queryResults) => set({posts: queryResults, fetched: true}),
}));

const forumStore = create(devtools(useForumStore));

export default forumStore;
