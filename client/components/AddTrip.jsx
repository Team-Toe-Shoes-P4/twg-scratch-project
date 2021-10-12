import React, { useState, useEffect } from "react"; 
import { Grid, TextField, Button, Paper } from '@material-ui/core';
//import logo from '../images/journalLogo';  
// import Map from "./Map.jsx";
          


function AddTrip(props, setAllTrips) {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  let renderTripDetailOrAddTrip;

  const handleSubmission = (e) => { // moved from Main
    e.preventDefault();
    console.log('submitted', newTrip);
    // add new journal entry to DB
    fetch(`/api/addTrip`, {
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
  // onClick={handleSubmission} onclick needed
  
  return (
    <Paper elevation={10} style={{margin:"50px"}}>

      <Grid container direction="column" alignItems="center" justifyContent="center" minHeight="100vh" spacing={5}> 
       {/* input field to add new journal entry. neeeds to be combined with input fields for date & trip duration. */}
       {/* <div className="cell"> */}
            {/* <Grid item> <Map/> </Grid> */}
        <Grid item>
             <Button class='SubmitButton' onClick={handleSubmission}>Submit Entry </Button>

               <span></span> <br />
             {/* <input
               type="text"
               onChange={(e) => setTrip(e.target.value)}
             /> */}
       </Grid>
      </Grid>
    </Paper>

  )
 
}        
            
export default AddTrip;