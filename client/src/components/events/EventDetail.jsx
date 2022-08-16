import React from 'react';
import axios from 'axios';

const user_id = 2;
const EventDetail = (props) => {
  const handleCancel = (e) => {
    const eventID = e.target.attributes.data.value;
    const creatorID = e.target.attributes[1].value;
    if (creatorID === user_id) {
      axios.delete(`/removeEvent/${eventID}`).then(() => {
        props.add();
      });// will need to delete both events table's row and all the rows related to eventID in user_event table//if possible, remove it from google calendar
    } else {
      axios.delete(`/updateAttend/${eventID}/${user_id}`).then(() => {
        props.add();
      });// will need to delete user_event table's row//if possible remove it from google calendar
    }
  };
  const handleAdd = (e) => {
    const eventID = e.target.attributes.data.value;
    axios.post(`/addAttend/${eventID}/${user_id}`).then(() => {
      props.add();
    });
  };
  return (
    <>
      {props.allEvents && props.allEvents.map((item, index) => {
        return (
          <div className="allEvents">
            <div data={item.id}>
              <h3>{item.title}</h3>
              <div>{props.allLang[item.langID-1].language_name}</div>
              {/* <div>{props.allJargon[item.jargonID-1].jargon_name}</div> */}
              <p>{item.descriptiÍon}</p>
              <div>Start time: {String(item.start)}</div>
              {item.allDay ? <div>All Day Event</div> : <div>End time: {String(item.end)}</div>}
              {props.selectEvent.includes(item.eventID) ? <button data={item.eventID} data-creator={item.creatorID} onClick={handleCancel}>Cancel</button> : <button data={item.eventID} onClick={handleAdd}>Add to your event</button>}
            </div>
          </div>

        );
      })}
    </>
  );
};

export default EventDetail;


