import create from 'zustand';
import {devtools} from 'zustand/middleware';
import axios from 'axios';

const buildEvent = (array) => {
  console.log(array);
  return array.map((item) => {
    return {
      title: item.description,
      location: item.location,
      photo: item.photo,
      jargonID: item.jargon_id,
      langID: item.lang_id,
      allDay: true,
      start: new Date(item.starttime),
      end: new Date(item.endtime),
      eventID: item.id,
      creatorID: item.user_id,
    };
  });
};

const useEventStore = (set) => ({
  //* ********************************************* */
  // should get this part from global, but for the time
  // being, I am just having it here for me to access
  user_id: 2,
  user_email: 'sharonhw888@gmail.com',
  allLanguages: null,
  allJargons: null,
  getAllLanguages: () => {
    axios.get('/allLanguagess').then((res) => {
      set({allLanguages: res.data});
    });
  },
  getAllJargons: () => {
    axios.get('/allJargonss').then((res) => {
      set({allJargons: res.data});
    });
  },
  //* ********************************************* */

  oldEvent: null,
  attend: [],
  show: false, // if show add event modal
  select: null, // the select event info
  date: new Date(), // selected event date
  showDetail: false, // if show the event detail

  getAllEvent: () => {
    axios.get('/allEvents').then((res) => {
      set({oldEvent: buildEvent(res.data)});
    });
  },
  getAttendEvent: (userID) => {
    axios.get(`/attendEvents/${userID}`).then((result) => {
      set({attend: result.data});
    });
  },

  setAllEvent: (newEvent) => set({oldEvent: [...oldEvent, newEvent]}),
  setAttend: (eventID) => set({attend: [...attend, eventID]}),
  setShow: (OF) => set({show: OF}),
  setSelect: (info) => set({select: info}),
  setDate: (e) => set({date: e}),
  setShowDetail: () => set({showDetail: true}),

});

const eventStore = create(devtools(useEventStore));

export default eventStore;
