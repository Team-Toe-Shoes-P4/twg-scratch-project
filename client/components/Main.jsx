//onclick functions to be established here and passed as props??
//planning page for trip

import React, { useEffect, useState } from 'react';
import AddTrip from './AddTrip.jsx';
import Map from './Map.jsx';
import TripForm from './TripForm.jsx';
import { Grid, TextField, Button, Paper } from '@material-ui/core';
import logo from '../images/journalLogo.png';
import { Redirect } from 'react-router';

function Main (props) {
    const [totalDays, updateDays] = useState('');
    const [journalEntry, journalUpdater] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [tripDetailOrAddTrip, setTripDetailOrAddTrip] = useState('tripDetail'); // to conditionally render either TripDetail or AddTrip component
    // const [deleter, entryDeleter] = useState('');
    // const [editor, entryEditor] = useState('');
    const DEFAULT_TRIP_ID = '6158907b4a83388f7dc89df9'; // make default trip dynamic to reflect the next soonest trip?
    let renderTripDetailOrAddTrip;

    const handleSubmission = (e) => {
      e.preventDefault();
      console.log('submitted', journalEntry);
      // add new journal entry to DB
      fetch(`/api/trips/${DEFAULT_TRIP_ID}/comments`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: journalEntry,
          date: Date.now()
        })
      }).then(response => response.json())
      .then(data => console.log("added"));
    };

    // useEffect(() => {
    //   fetch(`/api/trips/${DEFAULT_TRIP_ID}`, {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }).then(response => response.json())
    //   .then(data => {
    //     const commentData = data.data.trip.comments;

    //     for (let i = 0; i < commentData.length; i++) {
    //       comments.push(<p>{commentData[i].body}</p>);
    //     }
        
    //     setCommentList(comments);
    //   });

    //   // determine whether to render AddTrip or TripDetails component: ('PastTrips' ==> 'currentTrip?')
    //   renderTripDetailOrAddTrip = tripDetailOrAddTrip === 'tripDetail' ? <TripDetail /> : <AddTrip />;

    // }, []);
    //function that makes a get request to trip journal endpoint
    //send back note data which we'll render on page
      //with map with editing and deleting ability
      
    return (
      <Paper>
          <img src={logo} alt='Travel Planner logo'/> 
          <h2>I want to ...</h2><br/>
          <Map/>
          {renderTripDetailOrAddTrip}
          {/* button will possiblity redirect to page <Main/>  where the journal will cond render 
          Will need to import styling for margins etc
          */}
          {/* Will render <TripForm/> onClick */}
          <Button onClick={() => {}} variant="outlined" style={{margin:"6"}} size="large">Write About a New Trip </Button> 
           {/* Will render past trips from db  onClick*/}
          <Button onClick={() => {}} variant="outlined" style={{margin:"6"}} size="large">Go to a Past Trip!</Button> 
           {/* Will render most recent trip onClick?? */}
          <Button onClick={() => {}} variant="outlined" style={{margin:"6"}} size="large">Write About My Current Trip!</Button> 
          {/* <button class='SubmitButton' onClick={handleSubmission}>Edit An Entry</button> {/**currently handleSubmission is not set up to edit or delete  */}
          {/* <button class='SubmitButton' onClick={handleSubmission}>Delete An Entry </button> */}
      </Paper>
    )
  }

  export default Main;