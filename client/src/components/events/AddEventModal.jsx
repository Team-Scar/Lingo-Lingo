import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const hr = (new Array(24).fill(0)).map((val, ind) => {
  return ind;
});
const min = (new Array(12).fill(0)).map((val, ind) => {
  return ind * 5;
});

const AddEventModal = (props) => {
  const [newEvent, setNewEvent] = React.useState({title: '', allDay: true, start: '', end: ''});
  const [temp, setTemp] = React.useState();

  const handleSubmit = () => {
    console.log(newEvent);
  };
  return (

    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {
            props.closeModal();
          }}>x</button>
        </div>
        <div className="title">Create a new event</div>
        <div className="body">

          <input type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => {
            setNewEvent({...newEvent, title: e.target.value});
          }} />
          <input type="text" placeholder="Add Location" value={newEvent.location} onChange={(e) => {
            setNewEvent({...newEvent, location: e.target.value});
          }} />
          <input type="text" placeholder="Add Description" value={newEvent.description} onChange={(e) => {
            setNewEvent({...newEvent, description: e.target.description});
          }} />
          <select onChange={(e) => {
            setNewEvent({...newEvent, language: e.target.value});
          }}>
            <option value="none" selected disabled hidden>Select a Language</option>
            {props.allLang.map((item) => {
              return (
                <option data={item.id} value={item.language_name}>{item.language_name}</option>
              );
            })}
          </select>
          <select onChange={(e) => {
            setNewEvent({...newEvent, jargon: e.target.value});
          }}>
            <option value="none" selected disabled hidden>Select a Jargon</option>
            {props.allJargon.map((item) => {
              return (
                <option data={item.id} value={item.jargon_name}>{item.jargon_name}</option>
              );
            })}
          </select>

          <DatePicker placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />

          <select onChange={(e) => {
            const t1 = newEvent.start.getFullYear();
            const t2 = newEvent.start.getMonth() + 1;
            const t3 = newEvent.start.getDate();
            const t4 = e.target.value;
            setTemp(t2 + '/' + t3 + '/' + t1 + ' ' + t4);
          }}>
            {hr.map((item) => {
              return <option>{item}</option>;
            })}
          </select>
          <select onChange={(e) => {
            console.log(temp);
            const t6 = temp + ':' + (e.target.value || '00') + ':00';
            console.log(t6);
            setNewEvent({...newEvent, start: new Date(t6), end: new Date(t6)});
          }}>
            {min.map((item) => {
              return <option>{item}</option>;
            })}
          </select>
        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>


  );
};

export default AddEventModal;

