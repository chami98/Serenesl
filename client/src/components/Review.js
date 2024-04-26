import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
    textAlign: 'center',
    marginTop: '20px',
});

const StyledPaper = styled(Paper)({
    padding: '20px',
    margin: 'auto',
});

const StyledGridItem = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const StyledList = styled('ul')({
    listStyleType: 'none',
    padding: 0,
});

const StyledListItem = styled('li')({
    marginBottom: '8px',
});

const Review = ({
    generalFactors,
    medicalHistory,
    currentDiagnosis,
    consumerLifestyle,
    userPreferences,
}) => {
    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <Typography variant="h5" component="h2" color="textPrimary" sx={{ marginBottom: '20px' }}>
                    Review
                </Typography>
                <div style={{ textAlign: 'left' }}>
                    <Grid container spacing={3}>
                        <StyledGridItem item xs={12} md={6}>
                            <Typography variant="h6" component="h3" color="textPrimary" gutterBottom>
                                General Factors
                            </Typography>
                            <StyledList>
                                <StyledListItem>Age: {generalFactors.age}</StyledListItem>
                                <StyledListItem>Height: {generalFactors.height}</StyledListItem>
                                <StyledListItem>Weight: {generalFactors.weight}</StyledListItem>
                                <StyledListItem>Gender: {generalFactors.gender}</StyledListItem>
                                <StyledListItem>Occupation: {generalFactors.occupation}</StyledListItem>
                                <StyledListItem>Marital Status: {generalFactors.maritalStatus}</StyledListItem>
                                <StyledListItem>Living Situation: {generalFactors.livingSituation}</StyledListItem>
                            </StyledList>
                        </StyledGridItem>
                        <StyledGridItem item xs={12} md={6}>
                            <Typography variant="h6" component="h3" color="textPrimary" gutterBottom>
                                Medical History
                            </Typography>
                            <StyledList>
                                <StyledListItem>Surgeries or been hospitalized: {medicalHistory.history}</StyledListItem>
                                <StyledListItem>Allergies: {medicalHistory.allergies.join(', ')}</StyledListItem>
                                <StyledListItem>Medications: {medicalHistory.medications.join(', ')}</StyledListItem>
                            </StyledList>
                        </StyledGridItem>
                        <StyledGridItem item xs={12} md={6}>
                            <Typography variant="h6" component="h3" color="textPrimary" gutterBottom>
                                Current Diagnosis
                            </Typography>
                            <StyledList>
                                <StyledListItem>Diagnosis: {currentDiagnosis.diagnosis.replace(/([a-z])([A-Z])/g, '$1 $2')}</StyledListItem>
                                <StyledListItem>Symptoms: {currentDiagnosis.symptoms.join(', ')}</StyledListItem>
                                <StyledListItem>Symptom Duration: {currentDiagnosis.symptomDuration}</StyledListItem>
                            </StyledList>
                        </StyledGridItem>
                        <StyledGridItem item xs={12} md={6}>
                            <Typography variant="h6" component="h3" color="textPrimary" gutterBottom>
                                Consumer Lifestyle
                            </Typography>
                            <StyledList>
                                <StyledListItem>Tobacco Use: {consumerLifestyle.tobaccoUse}</StyledListItem>
                                <StyledListItem>Exercise Frequency: {consumerLifestyle.exerciseFrequency}</StyledListItem>
                                <StyledListItem>Diet Description: {consumerLifestyle.dietDescription}</StyledListItem>
                            </StyledList>
                        </StyledGridItem>
                        <StyledGridItem item xs={12} md={6}>
                            <Typography variant="h6" component="h3" color="textPrimary" gutterBottom>
                                User Preferences
                            </Typography>
                            <StyledList>
                                <StyledListItem>Destination Preference: {userPreferences.destinationPreference.replace(/([a-z])([A-Z])/g, '$1 $2')}</StyledListItem>
                                <StyledListItem>Travel Companions: {userPreferences.travelCompanions}</StyledListItem>
                                <StyledListItem>Budget Range: {userPreferences.budgetRange}</StyledListItem>
                            </StyledList>
                        </StyledGridItem>
                    </Grid>
                </div>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Review;
