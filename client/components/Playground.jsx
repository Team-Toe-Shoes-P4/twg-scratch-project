import React, {useContext} from 'react'
import GoogleButton from 'react-google-button'
import { 
    Typography, 
    Grid,
    Container,
    Card,
    CardActionArea, 
    CardContent,
    CardMedia
} from "@mui/material"

import { AuthContext } from '../context/authContext.jsx'

//import AppHeader from "./AppHeader.jsx"
import AddTripForm from './c-MUI-components/AddTripForm.jsx'
import TripList from "./c-MUI-components/TripList.jsx"
import TripDetail from './c-MUI-components/TripDetail.jsx'

// Test Environment for C. Can delete later. Not important.

const Playground = () => {
    const context = useContext(AuthContext)
    return (<>
       <GoogleButton onClick={()=> {
            console.log('Google button clicked. Is authenticated?', context.isAuth)
            context.toggleIsAuth()    
        }} />
        {context.isAuth ? <h2>Welcome, user</h2> : <h2>Please sign in.</h2>}
        ADD TRIP COMPONENT:
        <AddTripForm />
        <br/>
        TRIP LIST COMPONENT (LIST OF TRIPCARDS):
        <TripList />
        <br/>
        TRIP DETAIL COMPONENT (TRIPCARD ONCLICK): 
        <TripDetail />
    </>)
}

export default Playground;