import create from 'zustand';
import {devtools} from 'zustand/middleware';

const usePostStore = ((set) => ({
  postData: {
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
  responsesData: [{}],
  fetched: false,
  setFetched: () => set({fetched: true}),
  loadPost: (queryResults) => set({postData: queryResults, fetched: true}),
  loadResponses: (queryResults) => set({postData: queryResults, fetched: true}),
}));

const postStore = create(devtools(usePostStore));

export default postStore;
