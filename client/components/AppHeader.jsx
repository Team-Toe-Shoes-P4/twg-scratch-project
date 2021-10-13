import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Delete this later
import useTheme from '@material-ui/core/styles/useTheme';

import { AuthContext } from '../context/authContext.jsx'
import Button from "./c-MUI-components/LogoutButton.jsx"

export default function AppHeader() {
  /* 
        --- > TO DO <---
        - Update Login Link
        - Maybe Pop up menu
    */
  const context = useContext(AuthContext)
  const classes = useStyles();
  // Delete this later
  console.log('Material UI theme object. Logged from <AppHeader />\n', useTheme())

  
  return (
    <div >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Travel App
          </Typography>
          <Button />
        </Toolbar>
      </AppBar>
      {/* 
        Empty toolbar prevents Header from covering page content.
        This method is shown in the MUI docs
      */}
      <Toolbar></Toolbar>
    </div>
  );
};

const useStyles = makeStyles({
  root: { flexGrow: 1, zIndex:100 },
  grow: { flexGrow: 1 },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});
