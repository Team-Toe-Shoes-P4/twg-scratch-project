
import React, {createContext, useState} from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { Theme } from './Theme.js';

const AuthContext = createContext();

function AuthProvider({children}) {
  // Could do a request to auth/isAuth or something and store the result in state
  const [isAuth, setIsAuth] = useState(false);
  const [userID, setUserID] = useState('');
  const [mapView, setMapView] = useState(true);

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
    mapView,
    toggleMapView: function(){
      setMapView(prevState=> !prevState);
    }
  };


  return (<>
    <CssBaseline />
    <MuiThemeProvider theme={Theme}>
      <AuthContext.Provider value={globalData}>
        {children}
      </AuthContext.Provider>
    </MuiThemeProvider>
  </>
  );
}

export { AuthContext, AuthProvider };