import React from 'react'
import { 
    Typography, 
    Grid,
    Container,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material"
import WifiIcon from '@mui/icons-material/Wifi';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
// import { WifiIcon } from '@mui/icons-material';

export default function TripDetail() {
    /*  --- > TO DO <---
        - Configure props
    */
    return (
        <Container maxwidth="md" sx={{marginTop: 5, marginBottom: 5}}>
            <Grid container spacing={3}>
                {/* Left side image/map*/}
                <Grid item md={7}>
                    <img width="100%" src='https://media.nationalgeographic.org/assets/photos/000/206/20669.jpg'/>
                </Grid>
                {/* Right side column & Vertical Grid*/}
                <Grid item md={5}>
                    <Grid container direct="column" spacing={2}>
                        {/* Trip Name */}
                        <Grid item sx={{marginTop:10}} md={12}>
                            <Typography variant="h4">
                                Kiev, Ukraine
                            </Typography>
                        </Grid>
                        {/* Trip Feature Title */}
                        <Grid item md={12}>
                            <Typography variant="h6">
                                Trip Features:
                            </Typography>
                        </Grid>
                        {/* Trip Features List/Icons */}
                        <Grid item md={12}>
                            <List>
                                {/* Benefit One */}
                                <ListItem>
                                    <ListItemIcon>
                                        <WifiIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Free Wifi"/>
                                </ListItem>
                                {/* Benefit Two */}
                                <ListItem>
                                    <ListItemIcon>
                                        <FastfoodIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="All-You-Can-Eat Paska"/>
                                </ListItem>
                                {/* Benefit One */}
                                <ListItem>
                                    <ListItemIcon>
                                        <AirportShuttleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Airport Shuttle to Hotel"/>
                                </ListItem>
                            </List>
                        </Grid>
                        {/* Button */}
                        <Grid item md={12} alignItems="center">
                            <Button variant="contained" size="large" fullWidth color="primary">
                                Invite A Friend
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Row 2: Trip Description*/}
                <Grid item md={12}>
                <Typography variant="h4">
                    Description:
                </Typography>
                <br/>
                <Typography>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}