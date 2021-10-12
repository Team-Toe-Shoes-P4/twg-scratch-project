import React, { useEffect, useState } from 'react';
import logo from '../images/journalLogo.png';
// import logo from '../images/journalLogo';


function TripDetail({curSelectedTrip}) { // props = current selected trip object
  // const [tripCoordinates, updateCoordinates] = useState('');
  //const handleSubmission = e => {};
  
  // SELECT DEFAULT VALUES WHEN NO TRIP IS PRESENT


  const { locationName, coordinates, startDate, endDate, description} = curSelectedTrip;


  return (
    <div className="allEntries"> {/*instead of rendering all entries, make it render only the entry corresponding to currently selected pin on map */}  
      <div className="cell" className='divScroll'>
      {locationName} 
      </div>
          {/* from previous */}
        {/* <div style={{backgroundColor:"green", width:"50%", height:"50%"}}>
            Trip Detail<br/>
            Where are you going? <br/>
            What are your dates? <br/>
        </div> */}
  </div>
  )
  
}
export default TripDetail;
