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

const useGlobalStore = ((set) => ({
  userName: '',
  userId: 1,
  user: null,
  setUser: (info) => {
    set((state) => ({
      user: info,
    }));
  },
  allLanguages: null,
  setLanguages: (languages) => {
    set((state) => ({
      allLanguages: languages,
    }));
  },
  allJargon: null,
  setJargon: (jargons) => {
    set((state) => ({
      allJargon: jargons,
    }));
  },
  currentFilters: {},
  currentPage: window.location.href,
  userLanguages: ['English', 'Spanish', 'German'],
  setUserLanguages: (languages) => set((state) => ({
    userLanguages: languages,
  })),
  userProficiencies: [],
  userTopics: ['Medicine', 'Tech', 'Sports'],
  setUserTopics: (topics) => set((state) => ({
    userTopics: topics,
  })),
  userConnections: [],
  showModal: false,
  clearFilters: () =>
    set((state) => ({
      currentFilters: {},
    })),
  addFilter: (filter) =>
    set((state) => ({
      currentFilters: {
        ...state.currentFilters,
        [filter]: true,
      },
    })),
  deleteFilter: (filter) =>
    set((state) => ({
      currentFilters: {
        ...state.currentFilters,
        [filter]: false,
      },
    })),
  modalOn: () => {
    set((state) => ({
      showModal: true,
    }));
  },
  modalOff: () => {
    set((state) => ({
      showModal: false,
    }));
  },
  updateCurrentPage: () => {
    set((state) => ({
      currentPage: window.location.href,
    }));
  },
  updateUserName: (value) => {
    set((state) => ({
      userName: value,
    }));
  },
  setUserId: (newId) => {
    set((state) => ({
      userId: newId,
    }));
  },
}));

const globalStore = create(devtools(useGlobalStore));

export default globalStore;
