import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop, CircularProgress } from '@mui/material';

const firebaseConfig = {
    apiKey: "AIzaSyAIill7SqDkqaA04bQJfTAGYNrXyJ3Vzo8",
    authDomain: "serene-sl.firebaseapp.com",
    projectId: "serene-sl",
    storageBucket: "serene-sl.appspot.com",
    messagingSenderId: "1010173675366",
    appId: "1:1010173675366:web:d670d66c5b0567f648aaa7",
    measurementId: "G-MSRVGDQGVW"
};

firebase.initializeApp(firebaseConfig);

function SignInSide({ setAuthenticated, setAccountType, setHospitalName, setTouristName }) {

    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberedEmail');
        const storedPassword = localStorage.getItem('rememberedPassword');

        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const userDoc = await firebase.firestore().collection('users').doc(userCredential.user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                console.log("Signed in successfully!", userData);
                setAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                const accountType = userData.accountType;
                const hospitalName = userData.hospitalName;
                const touristName = userData.name;
                localStorage.setItem('accountType', accountType);
                setAccountType(accountType)
                setHospitalName(hospitalName)
                setTouristName(touristName)
                console.log("accountType:", accountType);
                toast.success('Welcome aboard! You are now signed in!');
            } else {
                console.error("User data not found.");
                toast.error('User data not found.');
            }

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }
        } catch (error) {
            console.error("Error signing in:", error.message);
            toast.error(error.message == 'Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).' ? 'You have entered an invalid username or password' : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://www.bestvoyage.in/upload/blog/blog_-2022071406182265.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" >
                            Serene SL
                        </Typography>
                        <Typography component="p" variant="body1">
                            Enter your credentials to access your account
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <FormControlLabel
                                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    onClick={() => setLoading(false)}
                >
                    <CircularProgress color="inherit" />
                    <Typography variant="h6" color="inherit" component="div" sx={{ ml: 2 }}>
                        Signing in...
                    </Typography>
                </Backdrop>
            </Grid>
        </ThemeProvider>
    );
}

export default SignInSide;
