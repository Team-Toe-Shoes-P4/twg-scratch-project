//onclick functions to be established here and passed as props??
//page for individual user registration
import { useState } from 'react';
import React from 'react';
import style from '../index.css';
// import logo from '../images/journalLogo.png';

function Registration(props) {

  const [password, setUserPassword] = useState('');
  const [fullname, setfirstName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const submitFunc = (e) => {
    e.preventDefault();
    console.log('name and pass ', firstName, lastName, mobile, password)
    fetch('/users/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
            fullname,
            email,
            password
            })
    })
    .then(response => response.json())
    .then( data => console.log(data))
    .catch(() => console.log('fetch error has occurred'))
}
    return (
      <div>
        <h1> <a href='http://localhost:8080/Login'> <img src={logo} alt='Travel Planner logo'/> </a> </h1>
        <div className="document"> 
          <form action="" method="post">
            <div>
              <h2>Travel Planner Registration</h2>
              <p>
                <label for="name"></label>
                <input type="text" value={fullname} onChange={e => setfirstName(e.target.value)} placeholder="First Name"></input><br/>
              </p>
                <label for="email"></label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"></input>
              <p>
                <label for="password"> </label>
                <input type="password" required password={password} onChange={e => setUserPassword(e.target.value)} placeholder="Password"></input><br/>
              </p>
              <p>
                <label for="mobile"> </label>
                <input type="phone" required mobile={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile"></input><br/>
              </p>
              <button className="SubmitButton" onClick={submitFunc}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    
    )
  }

  export default Registration;