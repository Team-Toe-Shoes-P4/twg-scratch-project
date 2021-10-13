import React, {useEffect, useContext} from 'react'
import {useHistory} from "react-router-dom"
import { Button } from "@mui/material"

import { AuthContext } from '../../context/authContext.jsx'

export default function LogoutButton() {
    const {toggleIsAuth} = useContext(AuthContext)
    const history = useHistory();

    function handleButtonClick(e) {
        fetch("/auth/logout")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // history.push("/")
            toggleIsAuth()
        });
    }
    return (
        <Button
            variant="text"
            size="large"
            color="inherit"
            onClick={handleButtonClick}
        >
            Logout
        </Button>
    )
}