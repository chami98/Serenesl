import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const RecommendedTripPlan = ({ recommendedDestinations }) => {

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        setDestinations(recommendedDestinations);
    }, []);

    const cardStyles = {
        transition: 'transform 0.3s',
    };



    const handleHover = (e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
    };

    const handleHoverOut = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <>
            <Box textAlign="center">
                <Typography
                    variant="h5"
                    component="h2"
                    color="textPrimary"
                    gutterBottom
                    sx={{ mb: '25px' }}
                >
                    Recommended Travel Destinations
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {destinations.map((destination, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            style={cardStyles}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                        >
                            <CardMedia
                                component="img"
                                alt={destination.name}
                                height="180"
                                image={destination.imageUrl}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {destination.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    {destination.description}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {destination.location}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => window.open(destination.mapsUrl, '_blank')}
                                    style={{ marginTop: '10px' }}
                                    startIcon={<LocationOnIcon />}
                                >
                                    Show Map
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </>
    );
}

export default RecommendedTripPlan;