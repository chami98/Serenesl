import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useState } from 'react';
import PlanYourTrip from '../components/PlanYourTrip';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import TouristDrawerContent from '../components/TouristDrawerContent';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


const defaultTheme = createTheme();

export default function TouristDashboard({ touristName }) {

    const isDesktopView = useMediaQuery('(min-width:600px)');
    const [open, setOpen] = React.useState(isDesktopView);
    const toggleDrawer = () => {

        if (isDesktopView) {
            setOpen(!open);
        }
    };

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let greeting = '';

    if (currentHour >= 0 && currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    function getEmoji(hour) {
        if (hour >= 5 && hour < 12) {
            return '☀️';
        } else if (hour >= 12 && hour < 18) {
            return '🌤️';
        } else {
            return '🌙';
        }
    }

    const [planYourTripVisible, setPlanYourTripVisible] = useState(false)
    const [homeVisible, setHomeVisible] = useState(true)

    const handlePlanYourTripClick = () => {
        setPlanYourTripVisible(!planYourTripVisible)
        setHomeVisible(!homeVisible)
    }

    const handleHomeClick = () => {
        setHomeVisible(true)
        setPlanYourTripVisible(false)
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Serene SL
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <TouristDrawerContent handleHomeClick={handleHomeClick} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {homeVisible &&
                            <>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    color="textPrimary"
                                    gutterBottom
                                    sx={{ mb: '25px' }}
                                >
                                    {`${greeting} ${getEmoji(currentHour)}, ${touristName}`}
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Paper sx={{
                                            height: '100%',
                                            padding: 5,
                                            backgroundColor: '#ffffff', // Background color
                                            borderRadius: 10, // Rounded corners
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
                                            transition: 'transform 0.3s ease-in-out', // Smooth transition
                                            '&:hover': {
                                                transform: 'scale(1.02)' // Scale up on hover
                                            }
                                        }}

                                            onClick={() => handlePlanYourTripClick()}
                                        >
                                            <FlightTakeoffIcon sx={{ fontSize: 60, color: '#2196f3' }} /> {/* Icon color */}
                                            <Typography variant="h6" component="h2" sx={{ mt: 2, color: '#212121' }}> {/* Text color */}
                                                Plan Your Trip
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1, color: '#757575' }}> {/* Text color */}
                                                Start planning your next adventure.
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Paper sx={{
                                            height: '100%',
                                            padding: 5,
                                            backgroundColor: '#ffffff', // Background color
                                            borderRadius: 10, // Rounded corners
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow
                                            transition: 'transform 0.3s ease-in-out', // Smooth transition
                                            '&:hover': {
                                                transform: 'scale(1.02)' // Scale up on hover
                                            }
                                        }}>
                                            <DirectionsCarIcon sx={{ fontSize: 60, color: '#4caf50' }} /> {/* Icon color */}
                                            <Typography variant="h6" component="h2" sx={{ mt: 2, color: '#212121' }}> {/* Text color */}
                                                Ongoing Trips
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1, color: '#757575' }}> {/* Text color */}
                                                View and manage your ongoing trips.
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </>}
                        {planYourTripVisible && <PlanYourTrip />}
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
