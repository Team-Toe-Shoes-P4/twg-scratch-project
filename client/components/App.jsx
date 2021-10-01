// import React, { Component } from "react"
//onclick functions to be established here and passed as props??

import React, {useState, useEffect} from 'react';
import style from '../index.css';
import Login from './Login.jsx';
import GroupItin from './GroupItin.jsx';
import MyTripJournal from './MyTripJournal.jsx';
import Registration from './Registration.jsx';
import UserProfile from './UserProfile.jsx';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';
//create a sextion to add friends
function App() {
  //onCLick function in state here as well?
  //decl state variable by init and passing updating function 
  //assign useState with its val
  //make a copy of this arr when updating since invoking with replace it?
  
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [travelers, updateTravelers] = useState([]);
 


  function regSubmit (regObj) {
    //stores users reg info
    storeRegInfo(regObj);
    // const regInfo = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     password: password,
    //     userEmail: email
    // }
    console.log('reg deets ',regDetails)
  }
  //for reg component: firstName={regObj.regInfo.firstName} userEmail={regObj.regInfo.email} lastName={regObj.regInfo.lastName} password={regObj.regInfo.password} onChange={regSubmit}
    return (
      <Router>
        <div>
          <Switch> 
            <Route path="/Login">
              <Login/>
            </Route>
            <Route path="/GroupItin">
              <GroupItin/>
            </Route>
            <Route path="/MyTripJournal">
              <MyTripJournal/>
            </Route>
            <Route path="/Registration">
              <Registration onChange={regSubmit}/>
            </Route>
            <Route path="/UserProfile">
              <UserProfile/>
            </Route>
            <Route path="/">
              <Login/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }

  export default App;