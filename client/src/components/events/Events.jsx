import React from 'react';
// import { withRouter } from "react-router";
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

const hr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const min = (new Array(12).fill(0)).map((val, ind) => {
  return ind * 5;
});

const Events = () => {
  const [newEvent, setNewEvent] = React.useState({title: '', start: '', end: ''});
  const [oldEvent, setAllEvent] = React.useState(myEventsList);

  const [temp, setTemp] = React.useState();
  const handleAddEvent = () => {
    console.log(newEvent);
    setAllEvent([...myEventsList, newEvent]);
  };
  return (
    <div className="eventCalendar">
      <h1>I am an event</h1>
      <div>
        <input type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => {
          setNewEvent({...newEvent, title: e.target.value});
        }} />
        <DatePicker placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
        {/* <DateTimePickerComponent onChange={(e) => { setNewEvent({ ...newEvent, start: e.value, end: e.value }) }}></DateTimePickerComponent> */}
        <select onChange={(e) => {
          // var tt=newEvent.start.getHours()+1;
          // console.log(tt)

          const t1 = newEvent.start.getFullYear();
          const t2 = newEvent.start.getMonth() + 1;
          const t3 = newEvent.start.getDate();
          const t4 = e.target.value;
          // console.log(t1+t2)
          // console.log(t1);
          // console.log(t2);
          // console.log(t3);
          // console.log(t4);
          // setTemp(t1 + '-' + t2 + '-' + t3 + ' ' + t4);
          setTemp(t2 + '/' + t3 + '/' + t1 + ' ' + t4);
          // setNewEvent({...newEvent,start:t1+'-'+t2+'-'+t3+' '+t4,end:t1+'-'+t2+'-'+t3+' '+t4})
        }}>
          {hr.map((item) => {
            return <option>{item}</option>;
          })}
        </select>
        <select onChange={(e) => {
          // var temp=start+e.target.value
          // console.log(temp)
          console.log(temp);
          const t6 = temp + ':' + (e.target.value || '00') + ':00';
          console.log(t6);

          setNewEvent({...newEvent, start: new Date(t6), end: new Date(t6)});
        }}>
          {min.map((item) => {
            return <option>{item}</option>;
          })}
        </select>

        <button onClick={handleAddEvent} >Submit</button>
      </div>
      <Calendar
        localizer={localizer}
        events={oldEvent}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500}}
        selectable={true}
        onSelectSlot={(e) => {
          console.log(e.start);
        }}
        onSelectEvent={(e) => {
          console.log(e.title); console.log(e.start);
        }} />
    </div>
  );
};

// const ShowTheLocationWithRouter = withRouter(Events);
export default Events;
