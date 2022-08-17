import React from 'react';
import axios from 'axios';
// import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import {GoogleMap, useJsApiLoader, useLoadScript} from '@react-google-maps/api';

const Map = (props) => {
  const [center, setCenter] = React.useState();
  const {isLoaded}=useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCA9GDgmNlWNihNG7IBHwu0YcFb7gNE1Uc',
  });


  const geocode = () => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: props.location,
        key: 'AIzaSyCA9GDgmNlWNihNG7IBHwu0YcFb7gNE1Uc',
      },
    }).then((response) => {
      const exact=response.data.results[0].geometry.location;
      setCenter(exact);
      const mapOptions={
        center: exact,
        zoom: 12,
      };

      // const jjj=new google.maps.Map(document.getElementById('map'), mapOptions);
    });
  };

  React.useEffect(geocode, []);

  return (
    <>
      {isLoaded&&
      <div id="map">

        <GoogleMap
          center={center}
          zoom = {12}
          mapContainerClassName="map-container"
        ></GoogleMap>

      </div>}
    </>
  );
};

export default Map;

