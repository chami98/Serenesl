import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function ConsumerLifestyle({ consumerLifestyle, handleConsumerLifestyleChange }) {


    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(consumerLifestyle);
        // Provide visual feedback for submission
        alert('Form submitted successfully!');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', margin: 'auto' }}>
                <Typography variant="h5" component="h2" color="textPrimary" sx={{ marginBottom: '10px' }}>
                    Consumer Lifestyle
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="tobacco-use-label">Do you have a history of tobacco use?</InputLabel>
                                <Select
                                    labelId="tobacco-use-label"
                                    id="tobacco-use-select"
                                    value={consumerLifestyle.tobaccoUse}
                                    onChange={handleConsumerLifestyleChange}
                                    name="tobaccoUse"
                                >
                                    <MenuItem value="Yes, currently smoke">Yes, currently smoke</MenuItem>
                                    <MenuItem value="Yes, formerly smoked">Yes, formerly smoked</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="exercise-frequency-label">How often do you engage in exercise or physical activity?</InputLabel>
                                <Select
                                    labelId="exercise-frequency-label"
                                    id="exercise-frequency-select"
                                    value={consumerLifestyle.exerciseFrequency}
                                    onChange={handleConsumerLifestyleChange}
                                    name="exerciseFrequency"
                                >
                                    <MenuItem value="Daily">Daily</MenuItem>
                                    <MenuItem value="Several times a week">Several times a week</MenuItem>
                                    <MenuItem value="Once a week">Once a week</MenuItem>
                                    <MenuItem value="Rarely">Rarely</MenuItem>
                                    <MenuItem value="Never">Never</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="diet-description-label">How would you describe your typical diet?</InputLabel>
                                <Select
                                    labelId="diet-description-label"
                                    id="diet-description-select"
                                    value={consumerLifestyle.dietDescription}
                                    onChange={handleConsumerLifestyleChange}
                                    name="dietDescription"
                                >
                                    <MenuItem value="Mostly fruits and vegetables">Mostly fruits and vegetables</MenuItem>
                                    <MenuItem value="Balanced diet including a variety of foods">Balanced diet including a variety of foods</MenuItem>
                                    <MenuItem value="High in processed or fast foods">High in processed or fast foods</MenuItem>
                                    <MenuItem value="Vegetarian or vegan">Vegetarian or vegan</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}
