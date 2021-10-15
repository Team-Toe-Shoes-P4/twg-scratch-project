//onclick functions to be established here and passed as props??
//planning page for trip

import React, { useEffect, useContext, useState } from 'react';
// import logo from '../images/journalLogo.png';
import AppHeader from './AppHeader.jsx';
import Map from './Map.jsx';
import AddTrip from './AddTrip.jsx';
import TripDetail from './TripDetail.jsx';
import TripList from './c-MUI-components/TripList.jsx';

import { AuthContext } from '../context/authContext.jsx';


function Main (props) {  
  const defaultTrip =  {
    locationName : 'No trips available! Click the Add Trip button to get started.',
    coordinates : {latitude: 40.7128, longitude: -74.0060},
    startDate : 'No start date selected',
    endDate : 'No end date selected',
    description : 'This is where the description goes.', // in production these could be empty string, values included here for testing
    default: 'this is the default trip object' // to conditionally render no markers if default
  };
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [selected, setSelected] = useState({name: null, latitude: null, longitude: null}); // for addTrip mode only
  const [pastTrips, setPastTrips] = useState([]);
  const [upcomingOrPast, setUpcomingOrPast] = useState('upcoming');
  const [tripDetailOrAddTrip, setTripDetailOrAddTrip] = useState('tripDetail'); // to conditionally render either TripDetail or AddTrip component
  const [curSelectedTrip, setCurSelectedTrip] = useState(defaultTrip);
  const [isLoading, setIsLoading] = useState(true);


  const {isAuth, userID, mapView} = useContext(AuthContext);
  
  let renderTripDetailOrAddTrip;
  let listToDisplay;
  // eslint-disable-next-line prefer-const
  listToDisplay = upcomingOrPast === 'upcoming' ? upcomingTrips : pastTrips;


  useEffect(() => {
    // GET all trips from DB corresponding to current user
    // eric2: 61664520a464b3356b6cb0bd
    // 6160bc7c7768777ca716ee68
    fetch(`/api/gettrips/${userID}`)
      .then(res => {return res.json();})
      .then(response => {
      // determine default selected trip:
        if (response.pastTrips.length) { 
          setPastTrips(response.pastTrips);
        }
        if (response.upcomingTrips.length) {
          setUpcomingTrips(response.upcomingTrips);
          const firstUpcomingTrip = response.upcomingTrips[0];
          setCurSelectedTrip(firstUpcomingTrip);
        } 
        setIsLoading(false);
      });
  }, []);
  // after we delete trip we need to reset upcoming Trips, 
  // we again need to see if there are any trips left and repeat viewUpcomingTrips
  // this will reset trip detail component, but need to see what's gonna happen with map after this.
  const deleteTrip = async (arg) => {
    try{

      const response = await fetch(`/api/deletetrip/${userID}`,  {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({trip_id: arg})
      });
      const data = await response.json();
      console.log('data after delete', data);
      setUpcomingTrips(data.upcomingTrips);
    }
    catch(err) {console.log(err);}
  };

  useEffect(() => {
    setCurSelectedTrip(upcomingTrips[0] ? upcomingTrips[0] : defaultTrip); 
  }, [upcomingTrips]);
  // determine whether to display markers for upcoming or past trips
  //listToDisplay = upcomingOrPast === 'upcoming' ? upcomingTrips : pastTrips;
  const viewUpcomingTrips = () => {
    setCurSelectedTrip(upcomingTrips[0] ? upcomingTrips[0] : defaultTrip); 
    setUpcomingOrPast('upcoming');
    
    setTripDetailOrAddTrip('tripDetail');
  };
  
 
  const viewPastTrips = () => {
    setCurSelectedTrip(pastTrips[0] ? pastTrips[0] : defaultTrip); 
    setUpcomingOrPast('past');
    
    setTripDetailOrAddTrip('tripDetail');
  };

  const viewAddTrip = () => {
    setTripDetailOrAddTrip('addTrip');
  };
  console.log('curSelectedTrip before passing to trip detail', curSelectedTrip);

  // determine whether to render AddTrip or TripDetails component:
  // eslint-disable-next-line prefer-const
  renderTripDetailOrAddTrip = tripDetailOrAddTrip === 'tripDetail' ? 
    <TripDetail curSelectedTrip={curSelectedTrip} listToDisplay={listToDisplay} upcomingOrPast={upcomingOrPast} deleteTrip={deleteTrip}/> 
    : <AddTrip selected={selected} setSelected={setSelected} setUpcomingTrips={setUpcomingTrips} setPastTrips={setPastTrips}/>;
    
  return (
    <div>
      {/* {props.userName}, you're on your way to: <br/> */}
      {isLoading && <div>loading</div>}
      { !isLoading && 
      <>
        <AppHeader 
          viewUpcomingTrips={viewUpcomingTrips}
          viewPastTrips={viewPastTrips}
          viewAddTrip={viewAddTrip}
        />
        <div>
          {/* */}
          {mapView ? 
            <Map 
              listToDisplay={listToDisplay} 
              upcomingOrPast={upcomingOrPast}
              upcomingTrips={upcomingTrips}
              setCurSelectedTrip={setCurSelectedTrip} 
              tripDetailOrAddTrip={tripDetailOrAddTrip} 
              defaultTrip={defaultTrip}
              selected={selected}
              setSelected={setSelected}
            /> 
            : <TripList />
          };                                                   
        </div>
        {renderTripDetailOrAddTrip}
        <div>
          {/* <button class='SubmitButton' onClick={handleSubmission}>Edit An Entry</button> {/**currently handleSubmission is not set up to edit or delete  */}
          {/* <button class='SubmitButton' onClick={handleSubmission}>Delete An Entry </button> */}
          {/* <label for='html'></label><br/> */}
        </div>
      </>}
    </div>
  );

}

export default Main;