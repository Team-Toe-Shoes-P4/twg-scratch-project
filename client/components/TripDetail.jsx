
import React, { useState, useEffect } from 'react'; 
// import logo from '../images/journalLogo';
import { 
  Typography, 
  Grid,
  Container,
  Button,
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

  console.log(curSelectedTrip);
  const { locationName, coordinates, startDate, endDate, description, _id} = curSelectedTrip;
  const start = new Date(startDate);
  const startUpdated = start.toLocaleDateString();
  const end = new Date(endDate);
  const endUpdated = end.toLocaleDateString();

  return (
    <Container maxWidth="md">
      {(listToDisplay && curSelectedTrip.locationName === listToDisplay[0]?.locationName && upcomingOrPast === 'upcoming') &&
           <>   <Typography align='center' variant="h5">
                Your next trip is to         { locationName }

           </Typography>
           <Typography align='center' variant="h5">
             <Button
               variant="text"
               type="button"
               size="large"
               color="primary"
               onClick = {() => deleteTrip(_id)}
             >CANCEL</Button>
           </Typography>
           </>
      }
      {(listToDisplay && curSelectedTrip.locationName === listToDisplay[0]?.locationName && upcomingOrPast === 'past') && 
              <Typography align='center' variant="h5">
                Your first trip was to        { locationName }

              </Typography>
      }
      {(listToDisplay && curSelectedTrip.locationName !== listToDisplay[0]?.locationName && upcomingOrPast === 'upcoming' && curSelectedTrip.locationName !== 'No trips available! Click the Add Trip button to get started.') && 
           <>
             <Typography align='center' variant="h5">
                You are going to        { locationName }
             </Typography>
             <Typography align='center' variant="h5">
               <Button
                 variant="text"
                 type="button"
                 size="large"
                 color="primary"
                 onClick = {() => deleteTrip(_id)}
               >CANCEL</Button>
             </Typography>
           </>
      }
      {(listToDisplay && curSelectedTrip.locationName !== listToDisplay[0]?.locationName && upcomingOrPast === 'past' && curSelectedTrip.locationName !== 'No trips available! Click the Add Trip button to get started.') && 
              <Typography align='center' variant="h5">
                You went to        { locationName }

              </Typography>
      }

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

      {listToDisplay.length !== 0 && 
      <div>
        {/* Trip Feature Title */}
        <Typography variant="subtitle1" align='center' sx={{color: '#555555'}}>
          { startUpdated } to { endUpdated }
        </Typography>
      
        {/* Row 2: Trip Description*/}
       
        <br/>
        <Typography sx={{height: '150px', overflow: 'scroll'}}>
          { description }          
        </Typography>
        
      </div>}

    </Container>
    
  );
  
}
export default TripDetail;