import React from 'react';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';

import globalStore from '../../zustand.js';
import Modal from '../Modal/Modal.jsx';
import MfnBtn from '../mfn_btn/MfnBtn.jsx';

import eventStore from './eventStore.js';
import Map4 from './Map4.jsx';

const EventDetail = (props) => {
  // suppose to get it from global store
  const user_id = eventStore((state) => state.user_id);
  const allLang = eventStore((state) => state.allLanguages);
  const allJargon = eventStore((state) => state.allJargons);

  // previous props
  const info = eventStore((state) => state.select);
  const selectEvent = eventStore((state) => state.attend);


  const [goCal, setGoCal]=React.useState();
  const handleCancel = (e) => {
    const eventID = e.target.attributes.data.value;
    const creatorID = e.target.attributes[1].value;
    if (creatorID === user_id) {
      axios.delete(`/removeEvent/${eventID}`).then(() => {
        props.add();
      });
    } else {
      axios.delete(`/updateAttend/${eventID}/${user_id}`).then(() => {
        props.add();
      });
    }
  };

  const responseGoogle=(response)=>{
    console.log(response);
  };
  const responseError=(err)=>{
    console.log(err);
  };

  const handleAdd = (e) => {
    const eventID = e.target.attributes.data.value;
    axios.post(`/addAttend/${eventID}/${user_id}`).then(() => {
      props.add();
    });
    setGoCal(<GoogleLogin clientId='866655618285-5vbvalfp3mn5j9te2du9g54i5sd9ip1t.apps.googleusercontent.com'
      buttonText='Sign in & Authorize Calendar'
      onSuccess={responseGoogle}
      onFailure={responseError}
      cookiePolicy={'single_host_origin'}
      responseType='code'
      accessType='offline'
      scope='openid email profile https://www.googleapis.com/auth/calendar'
    />);
  };
  return (
    <>
      {info &&
        <div className="eventDetails">
          <img className="eventPhoto" src={info.photo} />
          <h3>{info.title}</h3>
          <div>{allLang[info.langID - 1].language_name}</div>
          <div>{allJargon[info.jargonID - 1].jargon_name}</div>
          <p>{info.descriptiÍon}</p>
          <div>Start time: {String(info.start)}</div>
          {info.allDay ? <div>All Day Event</div> : <div>End time: {String(info.end)}</div>}
          {selectEvent.includes(info.eventID) ? <button data={info.eventID} data-creator={info.creatorID} onClick={handleCancel}>Cancel</button> : <button data={info.eventID} onClick={handleAdd}>Add to your event</button>}

          {info.location.includes('http') ? <a href={info.location}>online event</a> : <Map4 location={info.location} />}
          {goCal}
        </div>

      }
    </>
  );
};

export default EventDetail;


