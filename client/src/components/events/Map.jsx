import React from 'react';
import axios from 'axios';
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import


const Map = (props) => {
  var location=props.location;
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <div>should be a map here</div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

