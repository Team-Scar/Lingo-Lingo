import React from 'react';
import axios from 'axios';
import Map, {Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';


const Map4 = (props) => {
  const [position, setPosition] = React.useState();

  const geocode = () => {
    axios.get('/geoLocation', {
      params: {
        address: props.location,
      },
    }).then((res)=>{
      setPosition(res.data);
    });
  };

  React.useEffect(geocode, []);

  return (
    <div>
      {position&&<Map
        initialViewState={{latitude: position.lat, longitude: position.lng, zoom: 12}}
        mapLib={maplibregl}
        style={{width: 'auto', height: 200}}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Marker latitude={position.lat} longitude={position.lng} color="red" />
      </Map>
      }
    </div>
  );
};

export default Map4;

