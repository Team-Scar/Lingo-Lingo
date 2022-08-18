import React from 'react';
import axios from 'axios';
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';


const Map = (props) => {
  const [position, setPosition] = React.useState();

  const geocode = () => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: props.location,
        key: 'AIzaSyCA9GDgmNlWNihNG7IBHwu0YcFb7gNE1Uc',
      },
    }).then((response) => {
      console.log(response.data.results[0].geometry.location);
      setPosition([response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]);
    });
  };

  React.useEffect(geocode, []);

  return (
    <>
      {position&&<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <div>should be a map here</div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" opacity={0.5}
          zIndex={10}/>
        {/* <Marker position={position}>
          <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
      }
    </>
  );
};

export default Map;

