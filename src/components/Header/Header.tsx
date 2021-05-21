import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Logo from './../../assets/images/logo.png'
import UserImg from './../../assets/images/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { logout } from '../../redux/authReducer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Toolbar, Typography, Avatar, Popper, Grow, MenuList, MenuItem, ClickAwayListener } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: 'white'
    },
    button: {
        color: '#03645188;'
    },
    avatar:{
        marginRight: theme.spacing(2)
    }
})
)

const Header: React.FC = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout)
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        logoutCallback()
        setOpen(false);

    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Paper elevation={0} className={classes.root}><img src={Logo} alt="description" className={s.img}></img></Paper>
                {isAuth ?
                    <div>
                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        ><Avatar className={classes.avatar} alt="description" src={UserImg} />
                            <Typography variant="overline" display="block" gutterBottom>{login}</Typography>
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem component={Link} to="/profile"><Typography variant="overline" display="block" gutterBottom>My profile</Typography></MenuItem>
                                                <MenuItem component={Link} to="/setting" onClick={handleClose}><Typography  variant="overline" display="block" gutterBottom>Setting</Typography></MenuItem>
                                                <MenuItem onClick={handleClose}><Typography  variant="overline" display="block" gutterBottom>Logout</Typography></MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                        
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div> : <div>
                        <Box>
                            <Button variant="contained" color="primary" className={classes.button}><NavLink to={'/login'}>
                            Log in
                    </NavLink></Button>
                        </Box>
                    </div>}
            </Toolbar>
        </>

    )
}

export default Header