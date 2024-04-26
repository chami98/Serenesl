import React from 'react'
import { Card, CardContent, Typography, CardMedia, Grid, Box, hslToRgb, Button } from '@mui/material';
import hospitalData from '../utils/HospitalData';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function RecommendedHospital({ recomendedHospitals, recommendedWellnessCenter, recommendedAyurvedaHospital, setActiveStep, setSelectedHospital }) {

    const [hospitals, setHospitals] = useState([]);
    const [wellnessCenter, setWellnessCenter] = useState([]);
    const [ayurvedaHospital, setAyurvedaHospital] = useState([]);

    useEffect(() => {
        setHospitals(recomendedHospitals);
        setWellnessCenter(recommendedWellnessCenter);
        setAyurvedaHospital(recommendedAyurvedaHospital);
    }, []);

    const cardStyles = {
        transition: 'transform 0.3s',
    };


    const handleHospital = (hospital) => {
        setActiveStep(9);
        console.log('clicked')
        setSelectedHospital(hospital)
    }

    const handleHover = (e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
    };

    const handleHoverOut = (e) => {
        e.currentTarget.style.transform = 'scale(1)';
    };
    return (
        <>
            <Box mt={2} textAlign="center">
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ mb: '25px' }}
                >
                    Recommended Hospitals
                </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
                {hospitals.map((hospital, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            style={{ ...cardStyles, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverOut}
                        >
                            <CardMedia
                                component="img"
                                alt={hospital.name}
                                height="180"
                                image={hospital.imageUrl}
                            />
                            <CardContent sx={{ padding: '16px', minHeight: '120px' }}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {hospital.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    {hospital.type}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {hospital.location}
                                </Typography>
                                <div style={{ display: "flex", flexDirection: 'column' }}>
                                    <Typography variant="body2" color="textSecondary" component="p" display="inline">
                                        <LocalPhoneIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                        {hospital.phoneNumber}
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleHospital(hospital)}
                                        style={{ marginTop: '10px' }}
                                    >Generate Itenary & Treatment Plan
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box mt={2} textAlign="center">
                        <Typography
                            variant="h5"
                            component="h2"
                            color="textPrimary"
                            gutterBottom
                            sx={{ mb: '25px', mt: '25px' }}
                        >
                            Recommended Wellness Center
                        </Typography>
                    </Box>
                    <Grid container spacing={3} justifyContent="center">
                        {wellnessCenter.map((wCenter, index) => (
                            <Grid item xs={12} sm={6} md={12} key={index}>
                                <Link to={wCenter.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <Card
                                        style={{ ...cardStyles, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                        onMouseEnter={handleHover}
                                        onMouseLeave={handleHoverOut}
                                    >
                                        <CardMedia
                                            component="img"
                                            alt={wCenter.name}
                                            height="180"
                                            image={wCenter.imageUrl}
                                        />
                                        <CardContent sx={{ padding: '16px', minHeight: '120px' }}>
                                            <Typography variant="h5" component="h2" gutterBottom>
                                                {wCenter.name}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {wCenter.type}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {wCenter.location}
                                            </Typography> <Typography variant="body2" color="textSecondary" component="p" display="inline">
                                                <LocalPhoneIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                                {wCenter.phoneNumber}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Recommended Ayurveda Hospital */}
                <Grid item xs={12} md={6}>
                    <Box mt={2} textAlign="center">
                        <Typography
                            variant="h5"
                            component="h2"
                            color="textPrimary"
                            gutterBottom
                            sx={{ mb: '25px', mt: '25px' }}
                        >
                            Recommended Ayurveda Hospital
                        </Typography>
                    </Box>
                    <Grid container spacing={3} justifyContent="center">
                        {ayurvedaHospital.map((aHospital, index) => (
                            <Grid item xs={12} sm={6} md={12} key={index}>
                                <Link to={aHospital.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <Card
                                        style={{ ...cardStyles, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                        onMouseEnter={handleHover}
                                        onMouseLeave={handleHoverOut}
                                    >
                                        <CardMedia
                                            component="img"
                                            alt={aHospital.name}
                                            height="180"
                                            image={aHospital.imageUrl}
                                        />
                                        <CardContent sx={{ padding: '16px', minHeight: '120px' }}>
                                            <Typography variant="h5" component="h2" gutterBottom>
                                                {aHospital.name}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {aHospital.type}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {aHospital.location}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" display="inline">
                                                <LocalPhoneIcon style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                                {aHospital.phoneNumber}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid >

        </>

    )
}
