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
  responsesData: [
    {
      id: 1,
      response_to_id: '',
      content: 'TEXT TEXT TEXT TEXT TEXT',
      photo: 'https://picsum.photos/id/237/200/300',
      timestamp: '08/16/2022 11:11:11',
      vote: 5,
      user_id: 2,
      post_id: 5,
    },
    {
      id: 2,
      response_to_id: 1,
      content: 'MORE TEXT MORE TEXT MORE TEXT MORE TEXT MORE TEXT',
      photo: 'https://picsum.photos/id/1/200/300',
      timestamp: '08/16/2022 11:15:11',
      vote: 1,
      user_id: 3,
      post_id: 5,
    },
  ],
  fetched: false,
  setFetched: () => set({fetched: true}),
  loadPost: (queryResults) => set({postData: queryResults, fetched: true}),
  loadResponses: (queryResults) => set({postData: queryResults, fetched: true}),
}));

const postStore = create(devtools(usePostStore));

export default postStore;
