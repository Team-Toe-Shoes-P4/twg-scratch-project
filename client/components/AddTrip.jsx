import React, { useState, useEffect } from "react"; 
// import logo from '../images/journalLogo';
          
function AddTrip(selected, setAllTrips) {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [newTrip, setNewTrip] = useState({});

  const handleSubmission = (e) => { // moved from Main
    e.preventDefault();
    console.log('submitted', newTrip);
    // add new journal entry to DB
    fetch(`/api/addtrip/${USER_ID}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trip: newTrip,
        date: e.timeStamp
      })
    }).then(response => response.json())
    .then(response => {
      setAllTrips(response); // update list of all trips in state. should trigger a re-invokation of useLayoutEffect in Main & rerender Map markers
    });
  };

  return (
    
    <div>Hello this is the AddTrip component, thanks</div>
  )
  
}        
            
export default AddTrip;