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
      id: 3,
      response_to_id: '',
      content: 'TEXT TEXT TEXT TEXT TEXT',
      photo: 'https://picsum.photos/id/237/200/300',
      timestamp: '2022-08-10T01:15:49.000Z',
      vote: 5,
      username: 'asdf',
    },
    {
      id: 4,
      response_to_id: 1,
      content: 'MORE TEXT MORE TEXT MORE TEXT MORE TEXT MORE TEXT',
      photo: 'https://picsum.photos/id/1/200/300',
      timestamp: '2022-08-10T01:15:49.000Z',
      vote: 1,
      username: 'asdf2',
    },
  ],
  fetched: false,
  setFetched: () => set({fetched: true}),
  loadPost: (postQueryRes) => set(
      {
        postData: postQueryRes,
      },
  ),
  loadResponses: (responseQueryRes) => set(
      {
        responsesData: responseQueryRes,
      },
  ),

}));

const postStore = create(devtools(usePostStore));

export default postStore;
