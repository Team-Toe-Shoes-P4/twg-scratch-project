import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import LogoutButton from './c-MUI-components/LogoutButton.jsx';
import { AuthContext } from '../context/authContext.jsx';
import { makeStyles, AppBar, Toolbar, Typography, IconButton, Switch } from '@material-ui/core';

export default function AppHeader(props) {
  /* 
        --- > TO DO <---
        - Update Login Link
        - Maybe Pop up menu
    */
  const {mapView, toggleMapView} = useContext(AuthContext);
  const classes = useStyles();
  // Delete this later

  
  return (
    <div >
      <AppBar position="fixed">
        <Toolbar>
        
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Travel App
          </Typography>
          <Switch 
            checked={mapView}
            onChange={toggleMapView}
          />
          <Button variant="outlined" color='inherit' size='small' sx={{ m: '10px' }}  onClick={props.viewUpcomingTrips}> Upcoming Trips</Button>
          <Button variant="outlined" color='inherit' size='small' sx={{ m: '10px' }}  onClick={props.viewPastTrips}> Past Trips</Button>
          <Button variant="outlined" color='inherit' size='small' sx={{ m: '10px' }}  onClick={props.viewAddTrip}> Add Trip</Button>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      {/* 
        Empty toolbar prevents Header from covering page content.
        This method is shown in the MUI docs
      */}
      <Toolbar></Toolbar>
    </div>
  );
}

const useStyles = makeStyles({
  root: { flexGrow: 1, zIndex:100 },
  grow: { flexGrow: 1 },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});
