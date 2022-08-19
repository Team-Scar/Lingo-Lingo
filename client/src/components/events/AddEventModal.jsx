import React from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';

import globalStore from '../../zustand.js';


const hr = (new Array(24).fill(0)).map((val, ind) => {
  return ind;
});
const min = (new Array(12).fill(0)).map((val, ind) => {
  return ind * 5;
});


const AddEventModal = (props) => {
  const userLang = globalStore((state) => state.userLanguages);
  const userJargon = globalStore((state) => state.userTopics);

  const [newEvent, setNewEvent] = React.useState({title: '', allDay: true, start: props.startDate, end: '', language: 'English', jargon: 'Culture', photo: 'https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80'});
  const [temp, setTemp] = React.useState();
  const [photo, setPhoto]=React.useState();
  const handleSubmit = () => {
    axios.post(`/addEvent/${props.userID}`, newEvent).then((result) => {
      props.addEvent();
      props.closeModal();
    });
  };
  const preview=(e)=>{
    const source=URL.createObjectURL(Object.values(e.target.files)[0]);
    setPhoto(<img className="previewPhoto" src={source} />);
    const formData=new FormData();
    formData.append('file', Object.values(e.target.files)[0]);
    formData.append('upload_preset', 'ap4g9ume');

    axios.post('https://api.cloudinary.com/v1_1/dls2rxfqj/image/upload', formData).then(
        (response)=>{
          console.log(response);
          setNewEvent({...newEvent, photo: response[0]});
        },
    );
  };

  const [startDateTime, setStartDateTime]=React.useState('');
  const [endDateTime, setEndDateTime]=React.useState('');


  const modalState = globalStore((state) => state.showModal);
  const showModal = globalStore((state) => state.modalOn);
  const hideModal = globalStore((state) => state.modalOff);
  return (


    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button onClick={() => {
          // props.closeModal();
          if (!modalState) {
            showModal();
          } else {
            hideModal();
          }
        }}>x</button>
      </div>

      <div className="createEventTitle">
        <div className="actualTitle">Create a new event</div>
        <p className="subTitle">Let's rock and roll</p>
      </div>


      <div className="body">

        <div className="eventInput">
          <input type="text" placeholder="Add Event Description" value={newEvent.description} onChange={(e) => {
            setNewEvent({...newEvent, description: e.target.value});
          }} />
        </div>

        <div className="eventInput">
          <input type="text" placeholder="Add Location" value={newEvent.location} onChange={(e) => {
            setNewEvent({...newEvent, location: e.target.value});
          }} />
        </div>


        <div className="eventInput">
          <label className="ins">choose a language</label>
          <select onChange={(e) => {
            setNewEvent({...newEvent, language: e.target.value});
          }}>
            <option value="none" selected disabled hidden>Select a Language</option>
            {userLang.map((item, ind) => {
              return (
                <option data={ind} value={item}>{item}</option>
              );
            })}
          </select>
        </div>

        <div className="eventInput">
          <label className="ins">choose a jargon</label>
          <select onChange={(e) => {
            setNewEvent({...newEvent, jargon: e.target.value});
          }}>
            <option value="none" selected disabled hidden>Select a Jargon</option>
            {userJargon.map((item, ind) => {
              return (
                <option data={ind} value={item}>{item}</option>
              );
            })}
          </select>
        </div>

        <div className="eventInput">
          <label className="ins">start time</label>
          <input
            type="datetime-local"
            id="startDateTime"
            value={startDateTime}
            onChange={(e)=> {
              setStartDateTime(e.target.value);
              setNewEvent({...newEvent, start: e.target.value, end: e.target.value});
            }}/>
        </div>

        <div className="eventInput">
          <label className="ins">end time</label>
          <input
            type="datetime-local"
            id="endDateTime"
            value={endDateTime}
            onChange={(e)=> {
              setEndDateTime(e.target.value);
              setNewEvent({...newEvent, end: endDateTime, allDay: false});
            }}/>
        </div>

        <div className="eventInput">
          <label className="ins">choose a image</label>
          <input className="addImg" type='file' onChange={preview}/>
          {photo}
        </div>

        <div className="eventInput">
          <button className="eventButton" onClick={handleSubmit}>Submit</button>
        </div>

      </div>
    </div>


  );
};

export default AddEventModal;

