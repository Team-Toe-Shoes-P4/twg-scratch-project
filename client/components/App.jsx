import React, { useState, useEffect } from "react";
import Main from "./Main.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import LandingPage from "./LandingPage.jsx";

import Playground from "./Playground.jsx"
import {AuthProvider} from "../context/authContext.jsx"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
          
            {/* <Route path="/main">
              <Main />
            </Route>  
            <Route exact path="/">
              <LandingPage/>
            </Route> */}

            {/* Test route for C*/}
            <Route path="/playgrounds">
              <Playground/>
            </Route>
            <Route>
              {/* 404 Here */}
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
