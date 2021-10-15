import React, { useContext} from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authContext.jsx';



export default function LogoutButton() {
  const {toggleIsAuth, setUserID} = useContext(AuthContext);

  function handleButtonClick(e) {
    fetch('/auth/logout')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toggleIsAuth();
        setUserID('');
      });
  }
  return (
    <Button
      variant='text'
      size="large"
      color="inherit"
      onClick={handleButtonClick}
    >
            Logout
    </Button>

  );
}