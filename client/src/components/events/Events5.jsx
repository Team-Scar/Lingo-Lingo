import React, {useContext} from 'react';
import axios from 'axios';

import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import globalStore from '../../zustand.js';
import {AuthContext} from '../userauth/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';
import MfnBtn from '../mfn_btn/MfnBtn.jsx';

import eventStore from './eventStore.js';
import './events.scss';
import AddEventModal from './AddEventModal2.jsx';
import EventDetail from './EventDetail3.jsx';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


const Events = () => {
  const {currentUser} = useContext(AuthContext);
  // const user_email = globalStore((state) => state.user_email);
  // const user_id= globalStore((state) => state.user_id);
  // const allLang = globalStore((state) => state.allLanguages);
  // const allJargon= globalStore((state) => state.allJargons);

  const user_email = eventStore((state) => state.user_email);
  const user_id = eventStore((state) => state.user_id);
  const allLang = eventStore((state) => state.allLanguages);
  const allJargon = eventStore((state) => state.allJargons);
  const oldEvent = eventStore((state) => state.oldEvent);

  const attend = eventStore((state) => state.attend);
  const select = eventStore((state) => state.select);
  const showDetail = eventStore((state) => state.showDetail);
  const show = eventStore((state) => state.show);
  // const date = eventStore((state) => state.date);

  const getAllLanguages = eventStore((state) => state.getAllLanguages);
  const getAllJargons = eventStore((state) => state.getAllJargons);

  const setAllEvent = eventStore((state) => state.setAllEvent);
  const setAttend = eventStore((state) => state.setAttend);
  const setShow = eventStore((state) => state.setShow);
  // const setDate = eventStore((state) => state.setDate);
  const setSelect = eventStore((state) => state.setSelect);
  const setShowDetail = eventStore((state) => state.setShowDetail);

  const getAllEvent = eventStore((state) => state.getAllEvent);
  const getAttendEvent = eventStore((state) => state.getAttendEvent);


  const [date, setDate] = React.useState(new Date());
  const fetchData = () => {
    if (currentUser) {
      getAttendEvent(user_id);
    }
    getAllEvent();
    getAllLanguages();
    getAllJargons();
  };

  const modalContent = () => {
    return (<AddEventModal addEvent={fetchData}/>);
  };

  React.useEffect(fetchData, []);

  return (
    <div className="eventContainer">


      {/* <button onClick={() => {
        setShow(true);
      }}>Add New Event</button> */}
      <Modal children={modalContent()}/>

      {show && <AddEventModal addEvent={fetchData}/>}
      {oldEvent&&<div className="eventCalendar">
        <Calendar
          localizer={localizer}
          events={oldEvent}
          startAccessor="start"
          endAccessor="end"
          style={{height: '70%'}}
          selectable={true}
          onSelectSlot={(e) => {
            // console.log(e.start);
            // console.log(new Date(e.start));
            setShow(true);
            setDate(new Date(e.start));
          }}
          onSelectEvent={(e) => {
            console.log(e);
            setSelect(e);
            setShowDetail();
          }} />
      </div>}
      <div className="eventDetails">
        {showDetail&&<EventDetail info={select} add={fetchData} allLang={allLang} allJargon={allJargon} selectEvent={attend||[]}/>}
        <MfnBtn/>
      </div>
    </div>
  );
};

export default Events;
