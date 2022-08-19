import React, {useContext} from 'react';
import axios from 'axios';

import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {AuthContext} from '../userauth/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import globalStore from '../../zustand.js';
import Modal from '../Modal/Modal.jsx';
import MfnBtn from '../mfn_btn/MfnBtn.jsx';

import './events.scss';
import AddEventModal from './AddEventModal.jsx';
import EventDetail from './EventDetail2.jsx';

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


const user_id = 2;// just to assume it is passed in from props
const Events = () => {
  const navigate = useNavigate();// why do we need this???
  const user_id= globalStore((state) => state.userId);
  const allLang= globalStore((state) => state.allLanguages);
  const allJargon= globalStore((state) => state.allJargon);
  const selectLang= globalStore((state) => state.userLanguages);
  const selectJargon= globalStore((state) => state.userTopics);


  const [oldEvent, setAllEvent] = React.useState();
  const [attend, setAttend] = React.useState();

  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);
  const [select, setSelect] = React.useState();

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


  const fetchData = () => {
    if (user_id) {
      axios.get(`/attendEvents/${user_id}`).then((result) => {
        setAttend(result.data);
      });
    }
    axios.get('/allEvents').then((res) => {
      setAllEvent(buildEvent(res.data));
    });
  };

  const addOneEvent=<AddEventModal startDate={date} userID={user_id} allLang={allLang} allJargon={allJargon} addEvent={(newEvent) => {
    setAllEvent([...oldEvent, newEvent]);
  }} closeModal={() => {
    setShow(false);
  }} />;

  React.useEffect(fetchData, []);

  return (
    <div className="eventContainer">

      <Modal children={addOneEvent} />

      {show && addOneEvent}
      <div className="eventCalendar">
        <Calendar
          localizer={localizer}
          events={oldEvent}
          startAccessor="start"
          endAccessor="end"
          style={{height: '70%'}}
          selectable={true}
          onSelectSlot={(e) => {
            console.log(e.start);
            setShow(true);
            setDate(new Date(e.start));
          }}
          onSelectEvent={(e) => {
            console.log(e);
            setSelect(e);
            setShowDetail(true);
          }} />
      </div>
      {showDetail && <EventDetail info={select} add={fetchData} allLang={allLang} allJargon={allJargon} selectEvent={attend || []} />}
      <MfnBtn />
    </div>
  );
};

export default Events;
