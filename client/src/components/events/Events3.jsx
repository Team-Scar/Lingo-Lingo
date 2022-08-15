import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Events = () => {
  const [date, setDate] = React.useState(new Date('2022-08-16 11:30:49'));

  var onChange=(date)=>{
    setDate(date);
    console.log(date)

  }
  return (
    <div>
      <Calendar onChange={onChange} value={new Date()} />
    </div>
  );
};

// const ShowTheLocationWithRouter = withRouter(Events);
export default Events;
