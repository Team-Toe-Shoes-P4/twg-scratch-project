import React, {useEffect, useState, useContext} from 'react';
import { Grid, Container } from '@mui/material';
import TripCard from './TripCard.jsx';
import { AuthContext } from '../../context/authContext.jsx';

export default function TripList() {
  {/* 
        --- > TO DO <---
        - Hit api, render a card for each trip object
        - Configure < TripCard /> props
    */}
  const [trips, setTrips] = useState();
  const context = useContext(AuthContext);

  // useEffect(() => {
  //     (async () => {
  //         const response = await fetch("")
  //         const data = await response.json();
  //         console.log(data);
  //         setTrips(data);
  //     })();
  // }, []);
    
  return (
    <Container maxwidth="md">
      <Grid container spacing={3}>
        <TripCard/>
        <TripCard/>
        <TripCard/>
      </Grid>
    </Container>
  );
}