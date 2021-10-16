
import React, { useState, useEffect } from 'react'; 
// import logo from '../images/journalLogo';
import { 
  Typography, 
  Grid,
  Container,
  Button,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';


function TripDetail({curSelectedTrip, listToDisplay, upcomingOrPast, deleteTrip}) { // props = current selected trip object
  // const [tripCoordinates, updateCoordinates] = useState('');
  //const handleSubmission = e => {}; 
  
  const { locationName, coordinates, startDate, endDate, description, _id} = curSelectedTrip;
  const start = new Date(startDate);
  const startUpdated = start.toLocaleDateString();
  const end = new Date(endDate);
  const endUpdated = end.toLocaleDateString();
  const url = `https://source.unsplash.com/random/?${locationName}`;

  
  return (
    <Container maxWidth="md" sx={{marginTop: '30px', height: '300px'}}>
      {/*Non-populated list */} 
      {!listToDisplay.length && 
      <Container sx={{marginTop: '80px'}}>
        <Typography align='center' variant="h5" paragraph={true}>
    There are no trips to display at this time. 
        </Typography>
        <Typography align='center' variant="h5" paragraph={true}>
              You can add a new trip by clicking ADD TRIP button
        </Typography>
      </Container>
      }

      {/* Populated list */}
      {listToDisplay.length !== 0 && 
      <Grid container spacing={3}>
        <Grid item md={7} sx={{ display: 'flex', height: '250px', width: '250px'}}>
          <CardMedia 
            component="img"
            image={url}
          />
          {/*<img style={{objectFit:'fill'}} src={url}/>*/}
        </Grid>
        <Grid item md={5}>
          {(listToDisplay && curSelectedTrip.locationName === listToDisplay[0]?.locationName && upcomingOrPast === 'upcoming') &&
        <>   
          <Typography align='left' variant="h5">
        Your next trip:       { locationName }
        
          </Typography>
          <Typography align='left' variant="h5">
            <Button
              variant="text"
              type="button"
              size="small"
              color="primary"
              onClick = {() => deleteTrip(_id)}
            >CANCEL</Button>
          </Typography>
        </>
          }
          {(listToDisplay && curSelectedTrip.locationName === listToDisplay[0]?.locationName && upcomingOrPast === 'past') && 
      <Typography align='left' variant="h5">
      Your first trip was to        { locationName }
      
      </Typography>
          }
          {(listToDisplay && curSelectedTrip.locationName !== listToDisplay[0]?.locationName && upcomingOrPast === 'upcoming' && curSelectedTrip.locationName !== 'No trips available! Click the Add Trip button to get started.') && 
    <>
      <Typography align='left' variant="h5">
    You are going to        { locationName }
      </Typography>
      <Typography align='left' variant="h5">
        <Button
          variant="text"
          type="button"
          size="small"
          color="primary"
          onClick = {() => deleteTrip(_id)}
        >CANCEL</Button>
      </Typography>
    </>
          }
          {(listToDisplay && curSelectedTrip.locationName !== listToDisplay[0]?.locationName && upcomingOrPast === 'past' && curSelectedTrip.locationName !== 'No trips available! Click the Add Trip button to get started.') && 
  <Typography align='left' variant="h5">
  You went to        { locationName }
  
  </Typography>
          }
          <div>
            {/* Trip Feature Title */}
            <Typography variant="subtitle1" align='left' sx={{color: '#555555'}}>
              { startUpdated } to { endUpdated }
            </Typography>

            {/* Row 2: Trip Description*/}

            <Typography align='left' sx={{height: '150px', overflow: 'scroll'}}>
              <pre style={{ fontFamily: 'inherit' }}>{ description }</pre>     
            </Typography>

          </div>
        </Grid>
      </Grid>}

    </Container>

  );
  
}
export default TripDetail;