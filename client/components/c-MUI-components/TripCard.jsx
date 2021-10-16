import React from 'react';
import {Link} from 'react-router-dom';
import { 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography, 
} from '@mui/material';

export default function TripCard({trip}) {

  const start = new Date(trip.startDate);
  const startUpdated = start.toLocaleDateString();
  const end = new Date(trip.endDate);
  const endUpdated = end.toLocaleDateString();
  const url = `https://source.unsplash.com/random/?${trip.locationName}`;

  return (
    <Card sx={{display: 'flex', height: '250px', width: '500px', margin: '20px'}}>
      <CardContent sx={{flexGrow:'1'}}>
        <Typography component="h2" variant="h5">
          {trip.locationName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {startUpdated} - {endUpdated}
        </Typography>
        <Typography variant="subtitle1" sx={{height:'100px', overflow: 'scroll'}} paragraph>
          <pre style={{ fontFamily: 'inherit' }}> {trip.description} </pre>
        </Typography>
        <Typography variant="subtitle1" color="primary">
                            See trip details...
        </Typography>
      </CardContent>
      {/* Could be a map here? Or image of location? Or just leave it for MVP*/}
      <CardMedia
        component="img"
        sx={{ width: 160, display: { xs: 'none', sm: 'block', md:'block', lg:'block' } }}
        image={url}
        alt="Map of trip"
      />
    </Card>
  );
}