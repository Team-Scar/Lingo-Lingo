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
  currentFilters: {},
  currentPage: window.location.href,
  userLanguages: ['English', 'Spanish', 'German'],
  userProficiencies: [],
  userTopics: ['Medicine', 'Tech', 'Space'],
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
}));

const globalStore = create(devtools(useGlobalStore));

export default globalStore;
