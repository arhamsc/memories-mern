import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memoriesText from '../../images/memories-Text.png';
import memoriesLogo from '../../images/memories-Logo.png';
import useStyles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile')),
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, logout, user?.token]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img
                    className={classes.image}
                    src={memoriesLogo}
                    alt="icon"
                    height="40px"
                />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        SignIn
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
