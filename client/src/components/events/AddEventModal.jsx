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
  const [newEvent, setNewEvent] = React.useState({title: '', allDay: true, start: props.startDate, end: '', language: 'English', jargon: 'Culture', photo: 'https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80'});
  const [temp, setTemp] = React.useState();

  const handleSubmit = () => {
    console.log(props.userID);
    props.addEvent(newEvent);
    axios.post(`/addEvent/${props.userID}`, newEvent).then((result) => {
      props.closeModal();
    });
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
            setNewEvent({...newEvent, description: e.target.value});
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

          <div className="startTime">Start Time
            <select onChange={(e) => {
              const t1 = newEvent.start.getFullYear();
              const t2 = newEvent.start.getMonth() + 1;
              const t3 = newEvent.start.getDate();
              const t4 = e.target.value;
              setTemp(t2 + '/' + t3 + '/' + t1 + ' ' + t4);
              const start = t2 + '/' + t3 + '/' + t1 + ' ' + t4 + ':00:00';
              setNewEvent({...newEvent, start: new Date(start)});
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

          <div className="startTime">End Time
            <select onChange={(e) => {
              const t1 = newEvent.start.getFullYear();
              const t2 = newEvent.start.getMonth() + 1;
              const t3 = newEvent.start.getDate();
              const t4 = e.target.value;
              setTemp(t2 + '/' + t3 + '/' + t1 + ' ' + t4);
              const end = t2 + '/' + t3 + '/' + t1 + ' ' + t4 + ':00:00';
              setNewEvent({...newEvent, end: new Date(end)});
            }}>
              {hr.map((item) => {
                return <option>{item}</option>;
              })}
            </select>
            <select onChange={(e) => {
              console.log(temp);
              const t6 = temp + ':' + (e.target.value || '00') + ':00';
              console.log(t6);
              setNewEvent({...newEvent, allDay: false, end: new Date(t6)});
            }}>
              {min.map((item) => {
                return <option>{item}</option>;
              })}
            </select>
          </div>

        </div>
        <div className="footer">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>


  );
};

export default AddEventModal;

