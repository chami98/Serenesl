import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default function CurrentDiagnosis({ currentDiagnosis, handleCurrentDiagnosisChange }) {


    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(currentDiagnosis);
        // Provide visual feedback for submission
        alert('Form submitted successfully!');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', margin: 'auto' }}>
                <Typography variant="h5" component="h2" color="textPrimary" sx={{ marginBottom: '10px' }}>
                    Current Diagnosis
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="diagnosis-label">What is your current diagnosis or reason for seeking medical attention?</InputLabel>
                                <Select
                                    labelId="diagnosis-label"
                                    id="diagnosis-select"
                                    value={currentDiagnosis.diagnosis}
                                    onChange={handleCurrentDiagnosisChange}
                                    name="diagnosis"
                                >
                                    <MenuItem value="AcuteInfection">Acute infection (e.g., respiratory, urinary)</MenuItem>
                                    <MenuItem value="ChronicCondition">Chronic condition (e.g., diabetes, hypertension)</MenuItem>
                                    <MenuItem value="Injury">Injury (e.g., fracture, sprain)</MenuItem>
                                    <MenuItem value="NeurologicalDisorder">Neurological disorder (e.g., migraine, epilepsy)</MenuItem>
                                    <MenuItem value="GastrointestinalIssue">Gastrointestinal issue (e.g., gastritis, irritable bowel syndrome)</MenuItem>
                                    <MenuItem value="CardiovascularCondition">Cardiovascular condition (e.g., heart failure, arrhythmia)</MenuItem>
                                    <MenuItem value="DermatologicalIssue">Dermatological issue (e.g., eczema, psoriasis)</MenuItem>
                                    <MenuItem value="MentalHealthConcern">Mental health concern (e.g., depression, anxiety)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="symptoms-label">What symptoms are you currently experiencing?</InputLabel>
                                <Select
                                    labelId="symptoms-label"
                                    id="symptoms-select"
                                    multiple
                                    value={currentDiagnosis.symptoms}
                                    onChange={handleCurrentDiagnosisChange}
                                    name="symptoms"
                                >
                                    <MenuItem value="Fever">Fever</MenuItem>
                                    <MenuItem value="Pain">Pain</MenuItem>
                                    <MenuItem value="Shortness of breath">Shortness of breath</MenuItem>
                                    <MenuItem value="Fatigue">Fatigue</MenuItem>
                                    <MenuItem value="Nausea or vomiting">Nausea or vomiting</MenuItem>
                                    <MenuItem value="Diarrhea">Diarrhea</MenuItem>
                                    <MenuItem value="Cough">Cough</MenuItem>
                                    <MenuItem value="Changes in appetite or weight">Changes in appetite or weight</MenuItem>
                                    <MenuItem value="None">None</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="symptom-duration-label">How long have you been experiencing these symptoms, and have they been getting better, worse, or staying the same over time?</InputLabel>
                                <Select
                                    labelId="symptom-duration-label"
                                    id="symptom-duration-select"
                                    value={currentDiagnosis.symptomDuration}
                                    onChange={handleCurrentDiagnosisChange}
                                    name="symptomDuration"
                                >
                                    <MenuItem value="Less than one week">Less than one week</MenuItem>
                                    <MenuItem value="1-2 weeks">1-2 weeks</MenuItem>
                                    <MenuItem value="2-4 weeks">2-4 weeks</MenuItem>
                                    <MenuItem value="More than 4 weeks">More than 4 weeks</MenuItem>
                                    <MenuItem value="Symptoms improving">Symptoms improving</MenuItem>
                                    <MenuItem value="Symptoms worsening">Symptoms worsening</MenuItem>
                                    <MenuItem value="Symptoms stable">Symptoms stable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}
