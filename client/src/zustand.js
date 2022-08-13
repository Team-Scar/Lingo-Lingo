// import create from 'zustand'

// const useBearStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

import create from 'zustand';
import {devtools} from 'zustand/middleware';

const useStore = ((set) => ({
  number: 0,
  increaseNumber: () => set((state) => ({number: state.number + 1})),
  decreaseNumber: () => set((state) => ({number: state.number - 1})),
}));

const devToolStore = create(devtools(useStore));

// function BearCounter() {
//   const bears = useStore((state) => state.bears)
//   return <h1>{bears} around here ...</h1>
// }

// function Controls() {
//   const increasePopulation = useStore((state) => state.increasePopulation)
//   return <button onClick={increasePopulation}>one up</button>
// }

export default devToolStore;
