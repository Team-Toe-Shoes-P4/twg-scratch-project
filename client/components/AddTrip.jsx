import React, { useState, useEffect, useContext } from 'react'; 
import { AuthContext } from '../context/authContext.jsx';


// import logo from '../images/journalLogo';
import { 
  Grid, 
  Button,
  Container, 
  Typography, 
  TextField,
} from '@mui/material';

const defaultTripValues = {
  locationName: '',
  description: '',
  startDate: '',
  endDate: '',
  coordinates: {latitude: 0, longitude: 0}
};
          
function AddTrip({ selected, setSelected, setUpcomingTrips, setPastTrips }) {
  const { userID } = useContext(AuthContext);
  const [formValues, setFormValues] = useState(defaultTripValues);
  const [noLocation, setNoLocation] = useState(false);
  const [tripAdded, setTripAdded] = useState(false);
  const context = useContext(AuthContext);
  
  useEffect(() => {
    setFormValues(prevFormValues => {
      return { ...prevFormValues, 
        locationName: selected.name, 
        coordinates : {latitude: selected.latitude, longitude: selected.longitude} };
    });
  }, [selected]);

  useEffect(() => { 
    if (tripAdded) {
      setTimeout(() => {
        setTripAdded(false);
      }, 3000);}
  }
  , [tripAdded]);

  useEffect(() => {if(noLocation && selected.longitude) {setNoLocation(false);} }, [selected]);
  function handleFormSubmit(e){
    e.preventDefault();
    if (!formValues.locationName) {setNoLocation(true); return;}

    const response = fetch(`/api/addtrip/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then(response => response.json())
      .then(data => {
        console.log('data after added', data);
        if (data.id) {setTripAdded(formValues.locationName);}
        setFormValues(defaultTripValues);
        setUpcomingTrips(data.upcomingTrips); 
        setPastTrips(data.pastTrips); 
        setSelected({name: null, latitude: null, longitude: null});
      })
      .catch(error => console.log(error));
    // Delete Later
    console.log('Add-trip-form values. Logged from < AddTripForm />\n', formValues);
    // Reset form fields
    // Update list of all trips in state. Triggers a re-invokation of useLayoutEffect in Main & rerender Map markers
  }

  return (
    <Container maxWidth="md" sx={{marginTop:'30px'}}>
      {tripAdded && 
         <Typography variant="h6" align="center">
         Trip to {tripAdded} has been successfully submitted!         
         </Typography>
      }
      {!tripAdded && <form onSubmit={handleFormSubmit} >
        <Grid container direction="column" spacing={1} justifyContent="center">
          {/* Form Title */}
          {(!formValues.locationName && !noLocation) &&
          <Typography variant="h6" align="center" text='secondary'>
              Please enter destination in Search Bar         
          </Typography>
          }
          {(formValues.locationName && !noLocation) &&
          <Typography variant="h6" align="center">
                You are going to {formValues.locationName}!
          </Typography>}
          {noLocation && 
          <Typography variant="h6" align="center" sx={{color:'red'}}>
              Please enter destination in Search Bar first       
          </Typography>}
          {/* Start-Date-Field Container*/}
          <Grid item >
            <TextField
              autoFocus
              InputLabelProps={{shrink:true}}
              fullWidth
              required
              size="small"
              name="startDate"
              label="Start Date"
              type="date"
              value={formValues.startDate}
              onChange={event=>{
                setFormValues(prevState=>{
                  return {
                    ...prevState,
                    startDate: event.target.value
                  };
                });
              }}
            />
          </Grid>
          {/* End-Date-Field Container*/}
          <Grid item >
            <TextField
              InputLabelProps={{shrink:true}}
              fullWidth
              required
              name="endDate"
              size="small"
              label="End Date"
              type="date"
              value={formValues.endDate}
              onChange={event=>{
                setFormValues(prevState=>{
                  return {
                    ...prevState,
                    endDate: event.target.value
                  };
                });
              }}
            />
          </Grid>
          {/* Description-Field Container*/}
          <Grid item >
            <TextField
              fullWidth
              required
              name="description"
              label="Trip Description"
              type="text"
              size="small"
              multiline
              rows={2}
              value={formValues.description}
              onChange={event=>{
                setFormValues(prevState=>{
                  return {
                    ...prevState,
                    description: event.target.value
                  };
                });
              }}
            />
          </Grid>
          {/* Submit-Button Container */}
          <Grid item >
            <Button 
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              color="primary"
            >
                  Submit
            </Button>
          </Grid>
        </Grid>
      </form>}
    </Container>
  );
  
}        
            
export default AddTrip;