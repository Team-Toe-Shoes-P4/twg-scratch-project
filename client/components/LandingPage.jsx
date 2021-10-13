import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AuthContext} from '../context/authContext.jsx'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Toe-Shoes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function validateEmail(str) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(str).toLowerCase());
}

const theme = createTheme();

export default function SignInSide() {


  const [isRegistered, setIsRegistered] = useState(true)

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [missingEntry, setMissingEntry] = useState(false);
  const [formatCorrect, setFormatCorrect] = useState(true);
  const [emailExists, setEmailExists] = useState(false);

  const {toggleIsAuth, setUserID} = useContext(AuthContext);
  let history = useHistory();


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistered && (!email || !password)) {setMissingEntry(true); return }
    if (!isRegistered && (!email || !password || !name)) {setMissingEntry(true); return}
    if (!isRegistered && validateEmail(email) === false) {setFormatCorrect(false); return}
    let url;
    url = isRegistered === true ? '/auth/login' : '/auth/signup';
    let body;
    body = isRegistered === true ? {
      email,
      password
    } : {name,
        email,
        password
    } 

    const res = await fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json();
    if(data.status && data.message.includes("E11000")) {
      setEmailExists(true)
    }

    if(data.user) {toggleIsAuth(); setUserID(data.user._id); history.push('/main')}
    console.log(data)
  };

  useEffect(() => { 
    if (missingEntry === true) {
      setTimeout(() => {
        setMissingEntry(false);
      }, 2000);}
  }
  , [missingEntry]);

  useEffect(() => { 
    if (formatCorrect === false) {
      setTimeout(() => {
        setFormatCorrect(true);
      }, 2000);}
  }
  , [formatCorrect]);

  useEffect(() => { 
    if (emailExists === true) {
      setTimeout(() => {
        setEmailExists(false);
      }, 2000);}
  }
  , [emailExists]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {isRegistered && "SIGN IN"}
                {!isRegistered && "SIGN UP"}            
                </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {missingEntry && 
               <Typography style={{color:"red"}} component="p">
              All inputs required
              </Typography>
              }

              {emailExists && 
               <Typography style={{color:"red"}} component="p">
              User with this email is already registered. Please login.
              </Typography>
              }

              {!formatCorrect && 
               <Typography style={{color:"red"}} component="p">
                Incorrect email format             
               </Typography>
              }

              { !isRegistered && <>
              <TextField
              onChange = {(e) => setName(e.target.value)}
               margin="normal"
               required
               fullWidth
               name="name"
               label="Name"
               type="name"
               id="name"
               autoComplete="name"
             /> 
              <TextField
                onChange = {(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange = {(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> </>}
              {isRegistered && 
              <>
               <TextField
                onChange = {(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange = {(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> </>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isRegistered && "Sign In"}
                {!isRegistered && "Sign Up"}

              </Button>
              <Grid container>
                
                <Grid item>
                 
                <Button onClick = {() => {setIsRegistered(!isRegistered); setEmail(null); setName(null); setPassword(null)}}>                  
               {isRegistered && "Don't have an account? Sign Up" }
               {!isRegistered && "Back to Login" }
                </Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}