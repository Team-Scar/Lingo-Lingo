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

  const handleAdd = (e) => {
    const eventID = e.target.attributes.data.value;
    axios.post(`/addAttend/${eventID}/${user_id}`).then(() => {
      props.add();
    });
  };

  const time = new Date(props.info.start);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hr = time.getHours();
  const min = time.getMinutes();
  // const weekday=time.getDayOfWeek();

  return (
    <>
      {props.info &&
        <div className="eventDetails">
          <h3 className="eventColumn">Event Detail</h3>
          <div className="cardContent">
            <img className="eventPhoto" src={props.info.photo} />
            <h3 className="eventTitle">{props.info.title}</h3>

            <ul className="eventInfo">Language: {props.allLang[props.info.langID - 1].language_name}</ul>
            <ul className="eventInfo">Jargon: {props.allJargon[props.info.jargonID - 1].jargon_name}</ul>
            <ul className="eventInfo">Date: {month + '/' + day + '/' + year + ' (' + String(props.info.start).slice(0, 3) + ')'} </ul>
            <ul className="eventInfo">Time: {hr + ':' + min}</ul>
            <ul className="eventInfo">Location:{props.info.location.includes('http') ? <a href={props.info.location}>online event</a> : props.info.location}</ul>
            {props.info.location.includes('http') ? <></> : <Map4 location={props.info.location} />}


            {props.selectEvent.includes(props.info.eventID) ? <button className="eventButton" data={props.info.eventID} data-creator={props.info.creatorID} onClick={handleCancel}>Cancel</button> : <button className="eventButton" data={props.info.eventID} onClick={handleAdd}>Add to your event</button>}

          </div>
        </div>

      }
    </>
  );
};

export default EventDetail;


