import React from 'react';
import axios from 'axios';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';


import globalStore from '../../zustand.js';
import Modal from '../Modal/Modal.jsx';
import MfnBtn from '../mfn_btn/MfnBtn.jsx';

import Map4 from './Map4.jsx';


const user_id = 2;
const EventDetail = (props) => {
  const [showMap, setShowMap] = React.useState(false);
  const [goCal, setGoCal] = React.useState();
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

  const responseGoogle = (response) => {
    console.log('successssssss');
    console.log(response);
    const {code}=response;
    axios.post('/create-tokens', {code}).then((res)=>{
      console.log(res.data);
    });
  };
  const responseError = (err) => {
    console.log(err);
  };

  const handleAdd = (e) => {
    const eventID = e.target.attributes.data.value;
    axios.post(`/addAttend/${eventID}/${user_id}`).then(() => {
      props.add();
    });
    setGoCal(<><GoogleLogin clientId='866655618285-5vbvalfp3mn5j9te2du9g54i5sd9ip1t.apps.googleusercontent.com'
      buttonText='Sign in & Authorize Calendar'
      onSuccess={responseGoogle}
      onFailure={responseError}
      cookiePolicy={'single_host_origin'}
      responseType='code'
      accessType='offline'
      scope='openid email profile https://www.googleapis.com/auth/calendar'
    /><button onClick={add2GoogleCalendar}>add to your google calendar</button></>);
  };

  var add2GoogleCalendar=()=>{
    const form={
      description: props.info.title,
      location: props.info.location,
      startDateTime: props.info.start,
      endDateTime: props.info.end,
    };
    axios.post('/create-event', form).then((response)=>{
      console.log(response.data);
    }).catch((err)=>{
      console.log('there is errrrr in google calendar');
    });
  };

  React.useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: '866655618285-5vbvalfp3mn5j9te2du9g54i5sd9ip1t.apps.googleusercontent.com',
        scope: 'email',
        plugin_name: 'calendar react app',
      });
    };

    gapi.load('client:auth2', start);
  }, []);


  return (
    <>
      {props.info &&
        <div className="eventDetails">
          <img className="eventPhoto" src={props.info.photo} />
          <h3>{props.info.title}</h3>
          <div>{props.allLang[props.info.langID - 1].language_name}</div>
          <div>{props.allJargon[props.info.jargonID - 1].jargon_name}</div>
          <div>Start time: {String(props.info.start)}</div>
          {props.info.allDay ? <div>All Day Event</div> : <div>End time: {String(props.info.end)}</div>}
          {props.selectEvent.includes(props.info.eventID) ? <button data={props.info.eventID} data-creator={props.info.creatorID} onClick={handleCancel}>Cancel</button> : <button data={props.info.eventID} onClick={handleAdd}>Add to your event</button>}

          {props.info.location.includes('http') ? <a href={props.info.location}>online event</a> : <Map4 location={props.info.location} />}
          {goCal}

        </div>

      }
    </>
  );
};

export default EventDetail;


