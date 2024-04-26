import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';
import Divider from '@mui/material/Divider';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';


export default function HospitalDrawerContent() {
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
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <ListItemText primary="Appointments" />
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
