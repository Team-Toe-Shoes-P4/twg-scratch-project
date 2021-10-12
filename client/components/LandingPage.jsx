//import logo from './images/journalLogo.png';
import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import style from '../index.css';
import { Grid, TextField, Button, Paper, Card, CardContent } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
// import Typography from '@mui/material/Typography';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Checkbox from '@material-ui/core/Checkbox';
// import logo from '../images/journalLogo.png';
import { makeStyles } from '@material-ui/core/styles';
// // import { ViewHeadlineTwoTone } from '@mui/icons-material';
// import { ClassNames } from '@emotion/react';

// Still updating this component and the others!

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: '100vh',
//   },
//   image:{
//     backgroundImage:'',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   paper: {
//     margin: theme.spacing(4),
//     flexDirection: 'column',
//     display: 'flex'
//   },
//   form: {
//     width: '100%',
//     marginTop: auto
//   }
// }))

function LandingPage(props) {
  // const regComp = () => {
  //   //render reg component onClick
  // }

  // const classes = useStyles;
  // const loginUser = (username, password) => {
  //   fetch("/api/auth", {
  //     method: "POST",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: username,
  //       password: password,
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Data received: ", data);
  //     dispatch({
  //       type: types.SET_CURRENT_USER,
  //       payload: {
  //         name: data.data.user.name,
  //         email: data.data.user.email,
  //         id: data.data.user._id,
  //       },
  //     });
  //   })
  //   .catch((e) => console.log(e));

  // };

    return (
      <form>
        <Paper>
        {/* <Grid container className={classes.root}> */}
        <Grid container >
          {/* <Grid item className={classes.image}/> */}
          <Grid item />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4} square>Login</Grid>
          <TextField
          required
          variant="outlined"
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          margin="normal"
          autofocus
          >
          </TextField>
          <TextField
          required
          variant="outlined"
          fullWidth
          name="password"
          label="Password"
          type="password"
          margin="normal"
          autoComplete="current-password"
          >
          </TextField>
          <Button variant="outlined"
          fullWidth
          color="primary"
          variant="contained"
          style={{margin:"6"}}
          >Login</Button>
          <Button variant="outlined"
          style={{margin:"6"}}
          fullWidth
          color="primary"
          variant="contained"
          // onClick={regComp}
          >Register</Button>
        </Grid>
      </Paper>
      </form>

    )
  }
  //conditionally render this component based on user selection?
  // function Registration(props) {

  //   const [password, setUserPassword] = useState('');
  //   const [fullname, setfirstName] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [mobile, setMobile] = useState('');
  
  //   const submitFunc = (e) => {
  //     e.preventDefault();
  //     console.log('name and pass ', firstName, lastName, mobile, password)
  //     fetch('/users/login', {
  //         method: 'POST',
  //         mode: 'cors',
  //         headers: {
  //             "Content-type": "application/json"
  //         },
  //         body: JSON.stringify(
  //             {
  //             fullname,
  //             email,
  //             password
  //             })
  //     })
  //     .then(response => response.json())
  //     .then( data => console.log(data))
  //     .catch(() => console.log('fetch error has occurred'))
  // }
  //     return (
  //       <div>
  //         <h1> <a href='http://localhost:8080/Login'> <img src={logo} alt='Travel Planner logo'/> </a> </h1>
  //         <div className="document"> 
  //           <form action="" method="post">
  //             <div>
  //               <h2>Travel Planner Registration</h2>
  //               <p>
  //                 <label for="name"></label>
  //                 <input type="text" value={fullname} onChange={e => setfirstName(e.target.value)} placeholder="First Name"></input><br/>
  //               </p>
  //                 <label for="email"></label>
  //                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"></input>
  //               <p>
  //                 <label for="password"> </label>
  //                 <input type="password" required password={password} onChange={e => setUserPassword(e.target.value)} placeholder="Password"></input><br/>
  //               </p>
  //               <p>
  //                 <label for="mobile"> </label>
  //                 <input type="phone" required mobile={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile"></input><br/>
  //               </p>
  //               <button className="SubmitButton" onClick={submitFunc}>Submit</button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
      
  //     )
  //   }
  export default LandingPage;