import React from 'react';
import Button from '@mui/material/Button';

const NavButton = ({text, handleClick}) => {
  return (
    <Button onClick={handleClick}> {text}</Button>
  );
};

export default NavButton;