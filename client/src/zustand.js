import create from 'zustand';
import {devtools} from 'zustand/middleware';

// const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))


// function BearCounter() {
//   const bears = useStore((state) => state.bears)
//   return <h1>{bears} around here ...</h1>
// }

// function Controls() {
//   const increasePopulation = useStore((state) => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }

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
  }],

}));

const forumStore = create(devtools(useForumStore));

export default forumStore;
