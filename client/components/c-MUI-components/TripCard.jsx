import React from 'react'
import {Link} from 'react-router-dom'
import { 
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography, 
} from "@mui/material"

export default function TripCard(props) {
    /*  --- > TO DO <---
        - Configure props
        - Set < Link /> "to"-prop to trip-detail page
        - Maybe use an image or map
    */
    const { trip } = props
    return (
        <Grid item md={6}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Card sx={{display: 'flex'}}>
                    <CardContent>
                        <Typography component="h2" variant="h5">
                            My Trip Title
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            10-16-2021
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            See trip details...
                        </Typography>
                    </CardContent>
                    {/* Could be a map here? Or image of location? Or just leave it for MVP*/}
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image='https://media.nationalgeographic.org/assets/photos/000/206/20669.jpg'
                        alt="Map of trip"
                    />
                </Card>
            </Link>
        </Grid>
    )
}