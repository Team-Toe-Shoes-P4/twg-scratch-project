import logo from '../images/journalLogo.png';
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function Login(props) {

  const loginUser = (username, password) => {
    fetch("/api/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received: ", data);
      dispatch({
        type: types.SET_CURRENT_USER,
        payload: {
          name: data.data.user.name,
          email: data.data.user.email,
          id: data.data.user._id,
        },
      });
    })
    .catch((e) => console.log(e));

  };

    const [password, setPassword] = useState('');
    const [name, setUserName] = useState('');
    const [loginFail, setLoginFail] = useState(false);

    const history = useHistory();
    return (
    <div>login page</div>
    )
  }
  

  export default Login;