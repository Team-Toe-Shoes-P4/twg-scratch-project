import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import Main from './Main.jsx';
import LandingPage from './LandingPage.jsx';
import Playground from './Playground.jsx';
import '../index.css';

function App(props) {
  console.log('props.', props)
  console.log('context', AuthContext)
  const [isLoading, setIsLoading] = useState(true);
  const {isAuth, toggleIsAuth, setUserID} = useContext(AuthContext);

  useEffect(() => {
    (
      async() => {
        try{
          const response = await fetch('auth/verify');
          const data = await response.json();
        
          if (!isAuth) {
            if(data.isAuth) {toggleIsAuth(); setUserID(data.userID);}
          }
          if(isAuth) {
            if(!data.isAuth) {toggleIsAuth();}
          }
        }
        catch (err) {
          console.log(err);
        }
        finally {setIsLoading(false);}
      }
    )();
  }, [isAuth]
  );

  return (
    <Router>
      {isLoading && <div>Loading</div>}
      {!isLoading && 
        <div>
          <Switch>

            <Route path="/main">
              {isAuth ? <Main /> : <Redirect to='/' />}
            </Route>  

            <Route exact path="/">
              {isAuth ? <Redirect to='/main'/> : <LandingPage /> }
            </Route>
            {/* Test route for C*/}
            <Route path="/playgrounds">
              <Playground/>
            </Route>
            <Route>
              {/* 404 Here */}
            </Route>
          </Switch>
        </div>
      }
    </Router>
  );
}

export default App;
