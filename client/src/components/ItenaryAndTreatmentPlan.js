import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function ItineraryAndTreatmentPlan({ selectedHospital, condition }) {
    const [itineraryData, setItineraryData] = useState([]);
    const [treatmentData, setTreatmentData] = useState([]);

    const StyledTypography = styled(Typography)({
        textAlign: 'center',
    });

    useEffect(() => {
        const fetchItineraryData = async () => {
            try {
                const response = await axios.get('https://us-central1-serene-sl.cloudfunctions.net/SereneSL/itinerary');
                setItineraryData(response.data);
            } catch (error) {
                console.error('Error fetching itinerary data:', error);
            }
        };
        fetchItineraryData();
    }, []);

    useEffect(() => {
        const fetchTreatmentData = async () => {
            try {
                const response = await axios.get(`https://us-central1-serene-sl.cloudfunctions.net/SereneSL/treatmentPlan/${condition}`);
                await console.log("asasa", response.data)
                setTreatmentData(response.data);
            } catch (error) {
                console.error('Error fetching treatment data:', error);
            }
        };
        fetchTreatmentData();
    }, []);

    const updatedItineraryData = itineraryData.map((day) => ({
        ...day,
        morning: day.morning.replace('CDH', selectedHospital.name),
        title: day.title.replace('CDH', selectedHospital.name)
    }));

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, marginTop: 2 }}>
            <StyledTypography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ModeOfTravelIcon fontSize="large" sx={{ marginRight: '0.5rem' }} /> Trip Itinerary
            </StyledTypography>
            <List>
                {updatedItineraryData.map((day, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText primary={`Day ${index + 1}: ${day.title}`} />
                        </ListItem>
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Morning</Typography>
                                    <Typography>{day.morning}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Afternoon</Typography>
                                    <Typography>{day.afternoon}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Evening</Typography>
                                    <Typography>{day.evening}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        {index < updatedItineraryData.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
            <StyledTypography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MedicalServicesIcon fontSize="large" sx={{ marginRight: '0.5rem' }} /> Treatment Plan
            </StyledTypography>
            <List>
                <React.Fragment>
                    {treatmentData.title && (
                        <ListItem>
                            <ListItemText primary={treatmentData.title} />
                        </ListItem>
                    )}

                    {treatmentData.Description && (
                        <ListItem>
                            <ListItemText primary={`Description: ${treatmentData.Description}`} />
                        </ListItem>
                    )}

                    {treatmentData.Treatment && treatmentData.Treatment.Medication && treatmentData.Treatment.Duration && (
                        <ListItem>
                            <ListItemText primary={`Treatment: ${treatmentData.Treatment.Medication}`} />
                        </ListItem>
                    )}


                    {treatmentData.Treatment && treatmentData.Treatment.Duration && (
                        <ListItem>
                            <ListItemText primary={`Duration: ${treatmentData.Treatment.Duration}`} />
                        </ListItem>
                    )}

                    {treatmentData.Complications && (
                        <ListItem>
                            <ListItemText primary={`Complications: ${treatmentData.Complications}`} />
                        </ListItem>
                    )}

                    {treatmentData.Prevention && (
                        <ListItem>
                            <ListItemText primary={`Prevention: ${treatmentData.Prevention}`} />
                        </ListItem>
                    )}
                </React.Fragment>
            </List>

        </Paper>
    );
}
