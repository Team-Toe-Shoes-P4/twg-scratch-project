import React, {useEffect, useState, useContext} from 'react';
import { Grid, Container, Typography } from '@mui/material';
import TripCard from './TripCard.jsx';
import { AuthContext } from '../../context/authContext.jsx';

export default function TripList({listToDisplay, upcomingOrPast, defaultTrip}) {

  const [trips, setTrips] = useState();
  const context = useContext(AuthContext);

    
  return (
    <Container maxWidth={false} sx={{margin: '20px 0px', padding: '0px', height: 'calc(100vh - 100px)', overflow:'scroll'}}>
      {listToDisplay[0] === undefined && 
        <Typography align='center' variant="h5" paragraph={true} sx={{marginTop:'20%'}}>
          There are no trips to display at this time
        </Typography>
      }
      <Grid container spacing={3} sx={{diplay:'flex', justifyContent:'space-evenly'}}>
        
        {listToDisplay[0] && 
        listToDisplay.map((trip) => {return(
          <TripCard 
            key={trip._id}
            trip={trip}
          />
        );
        })}
      </Grid>
    </Container>
  );
}