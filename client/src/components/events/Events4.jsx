import React from 'react';
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
const myEventsList = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: moment().format(),
    end: moment().format(),
  },
  {
    title: 'Vacation',
    allDay: false,
    start: new Date('2022-08-16 11:30:49'),
    end: new Date('2022-08-16 11:30:49'),
  },
  {
    title: 'Conference',
    allDay: true,
    start: '8/16/2022 19:29:00',
    end: '8/16/2022 19:29:00',
  },
];

const buildEvent = (array) => {
  console.log(array);
  return array.map((item) => {
    const now = new Date(item.timestamp);
    const nowAdd1 = now.setTime(now.getTime() + (1 * 60 * 60 * 1000));
    return {
      title: item.description,
      location: item.location,
      jargonID: item.jargon_id,
      langID: item.lang_id,
      allDay: true,
      start: new Date(item.timestamp),
      end: nowAdd1,
      eventID: item.id,
      creatorID: item.user_id,
    };
  });
};
const user_id = 2;// just to assume it is passed in from props
const Events = () => {
  const [oldEvent, setAllEvent] = React.useState();
  const [attend, setAttend] = React.useState();
  const [newEvent, setNewEvent] = React.useState({title: '', start: '', end: ''});
  const [allLang, setAllLang] = React.useState();
  const [allJargon, setAllJargon] = React.useState();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    axios.get(`/attendEvents/${user_id}`).then((result) => {
      setAttend(result.data);
    });
    axios.get('/allEvents').then((res) => {
      setAllEvent(buildEvent(res.data));
    });
    axios.get('/allLanguages').then((res) => {
      console.log(res.data);
      setAllLang(res.data);
    });
    axios.get('/allJargons').then((res) => {
      console.log(res.data);
      setAllJargon(res.data);
    });
  }, []);

  return (
    <>
      <div>This is an event</div>
      <button onClick={() => {
        setShow(true);
      }}>Add New Event</button>
      {show && <AddEventModal allLang={allLang} allJargon={allJargon} closeModal={() => {
        setShow(false);
      }} />}
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
        }}
        onSelectEvent={(e) => {
          console.log(e);
        }} />
    </>
  );
};

export default Events;
