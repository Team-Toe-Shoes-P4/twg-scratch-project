import React, {useState, useContext} from 'react'
import { 
    Grid, 
    Button,
    Container, 
    Typography, 
    TextField,
} from "@mui/material"
import { AuthContext } from '../../context/authContext.jsx'

export default function AddTripForm({location, lat, lng}) {
    /* 
        - Keys that attach to req.body: 
            - startDate
            - endDate
            - description 

        --- > TO DO <---
        - Update fetch url
    */
    const [formValues, setFormValues] = useState(defaultFormValues)
    const context = useContext(AuthContext)
    
    // I think async/await was preventing e.preventDefault() from working, so the page was refreshing on submit
    function handleFormSubmit(e){
        e.preventDefault()
        console.log("Context object. Logged from < AddTripForm />\n", context)
        // Modify url
        // const url = `http://localhost:3000/api/addTrip/${context.user._id}`
        const response = fetch('', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        })
        .then(response => response.json())
        .then(data => {
            // Do something with your data here
            console.log(data)
        })
        .catch(error => console.log(error))
        // Delete Later
        console.log("Add-trip-form values. Logged from < AddTripForm />\n", formValues)
        // Reset form fields
        setFormValues(defaultFormValues)
    }
    
    return (
        <Container maxWidth="sm">
                <form onSubmit={handleFormSubmit} >
                    <Grid container direction="column" spacing={3} justifyContent="center">
                        {/* Form Title */}
                        <Typography variant="h5" align="center">
                            Add A Trip
                        </Typography>
                        {/* Start-Date-Field Container*/}
                        <Grid item >
                            <TextField
                                autoFocus
                                InputLabelProps={{shrink:true}}
                                fullWidth
                                required
                                name="startDate"
                                label="Start Date"
                                type="date"
                                value={formValues.startDate}
                                onChange={event=>{
                                    setFormValues(prevState=>{
                                        return {
                                            ...prevState,
                                            startDate: event.target.value
                                        }
                                    })
                                }}
                            />
                        </Grid>
                        {/* End-Date-Field Container*/}
                        <Grid item >
                            <TextField
                                InputLabelProps={{shrink:true}}
                                fullWidth
                                required
                                name="endDate"
                                label="End Date"
                                type="date"
                                value={formValues.endDate}
                                onChange={event=>{
                                    setFormValues(prevState=>{
                                        return {
                                            ...prevState,
                                            endDate: event.target.value
                                        }
                                    })
                                }}
                            />
                        </Grid>
                        {/* Description-Field Container*/}
                        <Grid item >
                            <TextField
                                fullWidth
                                required
                                name="description"
                                label="Trip Description"
                                type="text"
                                multiline
                                rows={3}
                                value={formValues.description}
                                onChange={event=>{
                                    setFormValues(prevState=>{
                                        return {
                                            ...prevState,
                                            description: event.target.value
                                        }
                                    })
                                }}
                            />
                        </Grid>
                        {/* Submit-Button Container */}
                        <Grid item >
                            <Button 
                                variant="contained"
                                type="submit"
                                fullWidth
                                size="large"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </Container>
    )
}

const defaultFormValues = {
    description: "",
    startDate: "",
    endDate: "",
}