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
import './events.scss';
const moment = require('moment');
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import AddEventModal from './AddEventModal.jsx';
import EventDetail from './EventDetail2.jsx';

import {AuthContext} from '../userauth/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';
import MfnBtn from '../mfn_btn/MfnBtn.jsx';

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
const user_email='sharonhw888@gmail.com';
const Events = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const [oldEvent, setAllEvent] = React.useState();
  const [attend, setAttend] = React.useState();
  const [allLang, setAllLang] = React.useState();
  const [allJargon, setAllJargon] = React.useState();
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [showDetail, setShowDetail]=React.useState(false);
  const [select, setSelect]=React.useState();

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


  const fetchData=()=>{
    if (currentUser) {
      axios.get(`/attendEvents/${user_id}`).then((result) => {
        setAttend(result.data);
      });
    }
    axios.get('/allEvents').then((res) => {
      setAllEvent(buildEvent(res.data));
    });
    axios.get('/allLanguagess').then((res) => {
      setAllLang(res.data);
    });
    axios.get('/allJargonss').then((res) => {
      setAllJargon(res.data);
    });
  };

  const modalContent=()=>{
    return (<AddEventModal startDate={date} userID={user_id} allLang={allLang} allJargon={allJargon} addEvent={(newEvent) => {
      setAllEvent([...oldEvent, newEvent]);
    }} closeModal={() => {
      setShow(false);
    }} />);
  };

  React.useEffect(fetchData, []);

  return (
    <div className="eventContainer">


      {/* <button onClick={() => {
        setShow(true);
      }}>Add New Event</button> */}
      <Modal children={modalContent()}/>

      {show && <AddEventModal startDate={date} userID={user_id} allLang={allLang} allJargon={allJargon} addEvent={fetchData} closeModal={() => {
        setShow(false);
      }} />}
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
      <div className="eventDetails">
        {/* {(oldEvent&&allLang&&allJargon) ? <EventDetail add={fetchData} allLang={allLang} allJargon={allJargon} allEvents={oldEvent} selectEvent={attend||[]}/>:<></>} */}
        {showDetail&&<EventDetail info={select} add={fetchData} allLang={allLang} allJargon={allJargon} selectEvent={attend||[]}/>}
        <MfnBtn/>
      </div>
    </div>
  );
};

export default Events;
