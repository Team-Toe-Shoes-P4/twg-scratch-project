
import React, {createContext, useState} from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Theme } from './Theme.js';

const AuthContext = createContext();

function AuthProvider({children}) {
  // Could do a request to auth/isAuth or something and store the result in state
  const [isAuth, setIsAuth] = useState(false);
  const [userID, setUserID] = useState('');

  // useEffect(() => {
  //     (async () => {
  //         const response = await fetch("")
  //         const data = await response.json();
  //         console.log(data);
  //         // set state with data
  //     })();
  //   }, []);

  const globalData = {
    isAuth,
    toggleIsAuth: function(){
      setIsAuth(prevState => !prevState);
    },
    userID, 
    setUserID: function(arg){
      setUserID(arg);
    },
  };


  return (
    <MuiThemeProvider theme={Theme}>
      <AuthContext.Provider value={globalData}>
        {children}
      </AuthContext.Provider>
    </MuiThemeProvider>
  );
}

export { AuthContext, AuthProvider };