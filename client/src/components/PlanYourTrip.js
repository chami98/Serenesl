import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MedicalHistory from './MedicalHistory';
import CurrentDiagnosis from './CurrentDiagnosis';
import ConsumerLifeStyle from './ConsumerLifeStyle';
import UserPreferences from './UserPreferences';
import RecommendedHospital from './RecommendedHospital';
import GeneralFactors from './GeneralFactors';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Review from './Review';
import RecommendedTripPlan from './RecommendedTripPlan';
import ItenaryAndTreatmentPlan from './ItenaryAndTreatmentPlan';

// Define steps for the health risk assessment questionnaire
const steps = ['General Factors', 'Medical History', 'Current diagnosis', 'Consumer Lifestyle', 'User Preferences', 'Review'];
export default function PlanYourTrip() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [generalFactors, setGeneralFactors] = React.useState({
        age: '',
        height: '',
        weight: '',
        gender: '',
        occupation: '',
        maritalStatus: '',
        livingSituation: ''
    });
    const [medicalHistory, setMedicalHistory] = useState({
        allergies: [],
        medications: [],
        history: []
    });

    const [currentDiagnosis, setCurrentDiagnosis] = useState({
        diagnosis: '',
        symptoms: [],
        symptomDuration: '',
    });

    const [consumerLifestyle, setConsumerLifestyle] = useState({
        tobaccoUse: '',
        exerciseFrequency: '',
        dietDescription: '',
    });

    const [userPreferences, setUserPreferences] = useState({
        destinationPreference: [],
        travelCompanions: '',
        budgetRange: '',
    });

    const [isGeneralFactorsFilled, setIsGeneralFactorsFilled] = useState(false);
    const [isMedicalHistoryFilled, setIsMedicalHistoryFilled] = useState(false);
    const [isCurrentDiagnosisFilled, setIsCurrentDiagnosisFilled] = useState(false);
    const [isConsumerLifestyleFilled, setIsConsumerLifestyleFilled] = useState(false);
    const [isUserPreferencesFilled, setIsUserPreferencesFilled] = useState(false);
    const [recomendedHospitals, setRecomendedHospitals] = useState([])
    const [recommendedAyurvedaHospital, setRecommendedAyurvedaHospital] = useState([])
    const [recommendedWellnessCenter, setRecommendedWellnessCenter] = useState([])
    const [recommendedDestinations, setRecommendedDestinations] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingDestination, setLoadingDestination] = useState(true);
    const [selectedHospital, setSelectedHospital] = useState({});

    const simulateLoadingHospital = () => {
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    }

    const simulateLoadingDestination = () => {
        setTimeout(() => {
            setLoadingDestination(false)
        }, 2500);
    }

    useEffect(() => {
        setIsGeneralFactorsFilled(checkIfGeneralFactorsFilled());
    }, [generalFactors]);

    useEffect(() => {
        setIsMedicalHistoryFilled(checkIfMedicalHistoryFilled());
    }, [medicalHistory]);

    useEffect(() => {
        setIsCurrentDiagnosisFilled(checkIfCurrentDiagnosisFilled());
    }, [currentDiagnosis]);

    useEffect(() => {
        setIsConsumerLifestyleFilled(checkIfConsumerLifestyleFilled());
    }, [consumerLifestyle]);

    useEffect(() => {
        setIsUserPreferencesFilled(checkIfUserPreferencesFilled());
    }, [userPreferences]);

    const checkIfGeneralFactorsFilled = () => {
        const { age, height, weight, gender, occupation, maritalStatus, livingSituation } = generalFactors;
        return !!age && !!height && !!weight && !!gender && !!occupation && !!maritalStatus && !!livingSituation;
    };

    const checkIfMedicalHistoryFilled = () => {
        const { allergies, medications, history } = medicalHistory;
        return allergies.length > 0 && medications.length > 0 && history.length > 0;
    };

    const checkIfCurrentDiagnosisFilled = () => {
        const { diagnosis, symptoms, symptomDuration } = currentDiagnosis;
        return !!diagnosis.length && !!symptoms.length && !!symptomDuration;
    };

    const checkIfConsumerLifestyleFilled = () => {
        const { tobaccoUse, exerciseFrequency, dietDescription } = consumerLifestyle;
        return !!tobaccoUse && !!exerciseFrequency && !!dietDescription;
    };

    const checkIfUserPreferencesFilled = () => {
        const { destinationPreference, travelCompanions, budgetRange } = userPreferences;
        return !!destinationPreference.length && !!travelCompanions && !!budgetRange;
    };




    const handleGeneralFactors = (event) => {
        const { name, value, type, checked } = event.target;
        setGeneralFactors(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };



    const handleMedicalHistoryChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (checked) {
                setMedicalHistory(prevState => ({
                    ...prevState,
                    [name]: [...medicalHistory[name], value]
                }));
            } else {
                setMedicalHistory(prevState => ({
                    ...prevState,
                    [name]: medicalHistory[name].filter(item => item !== value)
                }));
            }
        } else {
            setMedicalHistory(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const handleCurrentDiagnosisChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (checked) {
                setCurrentDiagnosis(prevState => ({
                    ...prevState,
                    [name]: [...currentDiagnosis[name], value]
                }));
            } else {
                setCurrentDiagnosis(prevState => ({
                    ...prevState,
                    [name]: currentDiagnosis[name].filter(item => item !== value)
                }));
            }
        } else {
            setCurrentDiagnosis(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };



    const handleConsumerLifestyleChange = (event) => {
        const { name, value } = event.target;
        setConsumerLifestyle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUserPreferencesChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            if (checked) {
                setUserPreferences(prevState => ({
                    ...prevState,
                    [name]: [...userPreferences[name], value]
                }));
            } else {
                setUserPreferences(prevState => ({
                    ...prevState,
                    [name]: userPreferences[name].filter(item => item !== value)
                }));
            }
        } else {
            setUserPreferences(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleRecommendHospitals = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(7);
        setSkipped(newSkipped);


        try {
            // Send GET request to the server
            const response = await axios.get('https://us-central1-serene-sl.cloudfunctions.net/SereneSL/hospitalRecommendation', {
                params: {
                    categories: encodeURIComponent(currentDiagnosis.diagnosis)
                }
            });

            // Handle the response from the server
            await setRecomendedHospitals(response.data.Hospitals);
            await setRecommendedWellnessCenter([response.data.WellnessCenter]);
            await setRecommendedAyurvedaHospital([response.data.AyurvedaHospital]);
            await console.log(recomendedHospitals)
            await console.log(recommendedWellnessCenter)
            simulateLoadingHospital()


        } catch (error) {
            // Handle errors
            console.error("Error fetching recommendation:", error);

        }
    };

    const handleRecommendTripPlan = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(8);
        setSkipped(newSkipped);

        try {
            simulateLoadingDestination()
            // Send GET request to the server
            const response = await axios.get('https://us-central1-serene-sl.cloudfunctions.net/SereneSL/destinationRecommendation', {
                params: {
                    categories: encodeURIComponent(userPreferences.destinationPreference)
                }
            });

            // Handle the response from the server
            await setRecommendedDestinations(response.data.Destinations);

            console.log("Recommendation destinations:", recommendedDestinations);
        } catch (error) {
            // Handle errors
            console.error("Error fetching recommendation:", error);

        }
    };

    const handleBack = () => {
        if (activeStep === 7) {
            setActiveStep(5);

        } else if (activeStep == 8) {
            setActiveStep(7);
        }

        else if (activeStep == 9) {
            setActiveStep(7);
        }

        else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === 7 ? (
                <React.Fragment>
                    <div>
                        {loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100vh',

                                }}
                            >
                                <CircularProgress color="primary" />
                                <div style={{ marginLeft: '10px', fontSize: '20px' }}>Recommendation On Progress...</div>
                            </Box>
                        ) : (
                            <Box sx={{ mt: 2, mb: 1 }}>
                                <RecommendedHospital recomendedHospitals={recomendedHospitals} recommendedAyurvedaHospital={recommendedAyurvedaHospital} recommendedWellnessCenter={recommendedWellnessCenter} setActiveStep={setActiveStep} setSelectedHospital={setSelectedHospital} />
                            </Box>)}
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            {!loading && (<Button
                                variant="contained"
                                color="secondary"
                                onClick={handleRecommendTripPlan}
                            >
                                Get Travel Recommendations
                            </Button>)}
                        </Box>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>

                    {activeStep === 8 && (
                        <>
                            {loadingDestination ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh',

                                    }}
                                >
                                    <CircularProgress color="primary" />
                                    <div style={{ marginLeft: '10px', fontSize: '20px' }}>Recommendation On Progress...</div>
                                </Box>
                            ) : (
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    <RecommendedTripPlan recommendedDestinations={recommendedDestinations} />
                                </Box>)}
                        </>
                    )
                    }

                    {(activeStep + 1) === 1 &&
                        <GeneralFactors generalFactors={generalFactors} handleGeneralFactors={handleGeneralFactors} />
                    }
                    {(activeStep + 1) === 2 &&
                        <MedicalHistory medicalHistory={medicalHistory} handleMedicalHistoryChange={handleMedicalHistoryChange} />
                    }
                    {(activeStep + 1) === 3 &&
                        <CurrentDiagnosis currentDiagnosis={currentDiagnosis} handleCurrentDiagnosisChange={handleCurrentDiagnosisChange} />
                    }
                    {(activeStep + 1) === 4 &&
                        <ConsumerLifeStyle consumerLifestyle={consumerLifestyle} handleConsumerLifestyleChange={handleConsumerLifestyleChange} />
                    }
                    {(activeStep + 1) === 5 &&
                        <UserPreferences userPreferences={userPreferences} handleUserPreferencesChange={handleUserPreferencesChange} />
                    }
                    {(activeStep + 1) === 6 &&
                        <Review
                            generalFactors={generalFactors}
                            medicalHistory={medicalHistory}
                            currentDiagnosis={currentDiagnosis}
                            consumerLifestyle={consumerLifestyle}
                            userPreferences={userPreferences}
                        />
                    }

                    {(activeStep + 1) === 10 &&
                        <ItenaryAndTreatmentPlan selectedHospital={selectedHospital} condition={currentDiagnosis.diagnosis} />
                    }

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0 || activeStep + 1 === 6}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        {activeStep !== steps.length - 1 && (<Button
                            onClick={handleNext}
                            disabled={
                                (activeStep === 0 && !isGeneralFactorsFilled) ||
                                (activeStep === 1 && !isMedicalHistoryFilled) ||
                                (activeStep === 2 && !isCurrentDiagnosisFilled) ||
                                (activeStep === 3 && !isConsumerLifestyleFilled) ||
                                (activeStep === 4 && !isUserPreferencesFilled) ||
                                (activeStep === 8)
                            }
                        >
                            Next
                        </Button>)}

                        {activeStep === steps.length - 1 && (
                            <>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleRecommendHospitals}
                                    style={{ marginRight: '10px' }}
                                >
                                    Get Hospital Recommendations
                                </Button>
                            </>
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
