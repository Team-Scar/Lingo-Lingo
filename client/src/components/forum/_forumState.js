import create from 'zustand';
import {devtools} from 'zustand/middleware';

const useForumStore = ((set) => ({
  posts: [],
  fetched: false,
  setFetched: () => set({fetched: true}),
  loadPosts: (queryResults) => set({posts: queryResults, fetched: true}),
  currentPost: null,
  setCurrentPost: (postId) => set({currentPost: postId}),
  newPost: {},
  createPost: (postObject) => set({newPost: postObject}),
  fetchedUser: () => false,
  setFetchedUser: () => set({fetchedUser: true}),
  unsetFetchedUser: () => set({fetchedUser: false}),
}));

const forumStore = create(devtools(useForumStore));

export default forumStore;
