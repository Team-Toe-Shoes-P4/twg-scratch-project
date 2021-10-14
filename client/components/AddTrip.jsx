import React, { useState, useEffect, useContext } from "react"; 
import { AuthContext } from '../context/authContext.jsx'

// import logo from '../images/journalLogo';
import { 
  Grid, 
  Button,
  Container, 
  Typography, 
  TextField,
} from "@mui/material"

const defaultTripValues = {
  locationName: "",
  description: "",
  startDate: "",
  endDate: "",
  coordinates: {latitude: 0, longitude: 0}
}
          
function AddTrip({ selected, setUpcomingTrips, setPastTrips }) {
  const { userID } = useContext(AuthContext);
  const [formValues, setFormValues] = useState(defaultTripValues)
  const context = useContext(AuthContext)
  console.log("selected in AddTrip: ", selected)
  
  useEffect(() => {
    setFormValues(prevFormValues => {
      return { ...prevFormValues, 
        locationName: selected.name, 
        coordinates : {latitude: selected.latitude, longitude: selected.longitude} }
      })
    console.log("selected in AddTrip useEffect: ", selected)
  }, [selected]);
  
  console.log("formValues: ", formValues)
  // I think async/await was preventing e.preventDefault() from working, so the page was refreshing on submit
  function handleFormSubmit(e){
    e.preventDefault()
    console.log("Context object. Logged from < AddTripForm />\n", context)
    // Modify url
    // const url = `http://localhost:3000/api/addTrip/${context.user._id}`
    const response = fetch(`/api/addtrip/${userID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formValues)
    })
    .then(response => response.json())
    .then(data => {
        // Do something with your data here
        console.log(data)
    })
    .catch(error => console.log(error))
    // Delete Later
    console.log("Add-trip-form values. Logged from < AddTripForm />\n", formValues)
    // Reset form fields
    setFormValues(defaultTripValues);
    // Update list of all trips in state. Triggers a re-invokation of useLayoutEffect in Main & rerender Map markers
    setUpcomingTrips(response.upcomingTrips); 
    setPastTrips(response.pastTrips); 
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center">
        You're going to {formValues.locationName}!
      </Typography>
      <form onSubmit={handleFormSubmit} >
      <Grid container direction="column" spacing={3} justifyContent="center">
          {/* Form Title */}
          <Typography variant="h5" align="center">
              Add A Trip
          </Typography>
          {/* Start-Date-Field Container*/}
          <Grid item >
              <TextField
                  autoFocus
                  InputLabelProps={{shrink:true}}
                  fullWidth
                  required
                  name="startDate"
                  label="Start Date"
                  type="date"
                  value={formValues.startDate}
                  onChange={event=>{
                      setFormValues(prevState=>{
                          return {
                              ...prevState,
                              startDate: event.target.value
                          }
                      })
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
                  label="End Date"
                  type="date"
                  value={formValues.endDate}
                  onChange={event=>{
                      setFormValues(prevState=>{
                          return {
                              ...prevState,
                              endDate: event.target.value
                          }
                      })
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
                  multiline
                  rows={3}
                  value={formValues.description}
                  onChange={event=>{
                      setFormValues(prevState=>{
                          return {
                              ...prevState,
                              description: event.target.value
                          }
                      })
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
    </form>
</Container>
  )
  
}        
            
export default AddTrip;