import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import MapGL, {Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import marker from '../images/marker.png';


// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZWNrc2RlZWVlZSIsImEiOiJja3VoZzU2aWcyZHk5Mm5xamVjYjJmYzBoIn0.jeBXbfS27jfUNY1XikYJ8w';

const Map = ({listToDisplay, tripDetailOrAddTrip, upcomingOrPast, setCurSelectedTrip, defaultTrip}) => {
  const myTrips = listToDisplay[0] ? listToDisplay : [defaultTrip];
  const [selected, setSelected] = useState({latitude: null, longitude: null}); // for addTrip mode only
  const [trips, setTrips] = useState(listToDisplay);
  const [viewport, setViewport] = useState(
    {
      latitude: myTrips[0].coordinates.latitude,
      longitude: myTrips[0].coordinates.longitude,
      zoom: 1
    }
  );
    // {
    //   latitude: 40.7128,
    //   longitude: -74.0060,
    //   zoom: 8
    // });
  useEffect(() => {
    if (tripDetailOrAddTrip === 'tripDetail') {
      setViewport({
        latitude: myTrips[0].coordinates.latitude,
        longitude: myTrips[0].coordinates.longitude,
        zoom: 1
      });
    }
    else {
      setViewport({
        latitude: 40.7306,
        longitude: -73.9866,
        zoom: 1
      });
    }
    setSelected({latitude: null, longitude: null});
    setTrips(listToDisplay) 
  }, [tripDetailOrAddTrip, upcomingOrPast]);

  const markerClick = (e) => {
    for (let trip of listToDisplay) {
      if (trip._id === e.target.id) {
        setViewport({
          latitude: trip.coordinates.latitude, 
          longitude: trip.coordinates.longitude,
          zoom: 4,
          transitionDuration: 2000,
        })

        setCurSelectedTrip(trip);
      }
    }
  }

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => {setViewport(newViewport);    
    },[]
  );

  useEffect(() => {
    document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0] ? document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value = null : null
  })

  return (
    <div className='map-page'>
    <div className='map-component'>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
       >

        {/* TRIP DETAILS MODE */}
        {tripDetailOrAddTrip === 'tripDetail' && 
        // could change 'trips' to listToDisplay:
        trips.map((el, i) => { return (
          <Marker 
            id={el._id}
            key={i}
            latitude={el.coordinates.latitude}
            offsetTop={-30}
            offsetLeft={-10}
            longitude={el.coordinates.longitude}
            onClick={(e) => markerClick(e)}
            >
            <img src={marker} id={el._id} className='marker' alt='marker' />
          </Marker>)
        })}

        {/* ADD TRIP MODE */}
        { selected.latitude &&
           <Marker 
            latitude={selected.latitude}
            offsetTop={-30}
            offsetLeft={-10}
            longitude={selected.longitude}>
            <img src={marker} className='marker' alt='marker' />
          </Marker>
        }
        {tripDetailOrAddTrip === 'addTrip' && 
        <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={handleViewportChange}
          reverseGeocode={true}

        // onSelected={(result) => setSelected( {name: result.result.place_name,
        //     latitude: result.result.center[1],
        //     longitude: result.result.center[0]}) }
        onResult={(result) => {setSelected( {name: result.result.place_name,
            latitude: result.result.center[1],
            longitude: result.result.center[0]});
          }
        }
        //  onClear={() => {
        //   setSelected({latitude: null, longitude: null});

        // }
        // }
          //position="top-center"
          marker={false}
        />
      }
      </MapGL>
    </div>
    {selected.latitude  && 
    <div>you're going to {selected.name}</div>}
    </div>
  );
};

export default Map