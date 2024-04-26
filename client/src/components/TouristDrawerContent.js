import * as React from 'react';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import FlightIcon from '@mui/icons-material/Flight';
import InboxIcon from '@mui/icons-material/Inbox';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';


export default function TouristDrawerContent({ handleHomeClick }) {


    const handleLogout = async () => {
        // Sign out user from Firebase
        firebase.auth()
            .signOut()
            .then(() => {
                console.log('User signed out successfully');
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/signin';
            })
            .catch((error) => {
                console.error('Error signing out:', error.message);
            });
    };

    return (
        <>
            <React.Fragment>
                <ListItemButton
                    onClick={() => handleHomeClick()}

                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Personal Records" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <FlightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Past Trips" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Information Hub" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ mt: 30 }} />
            <React.Fragment>
                <ListItemButton>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}
