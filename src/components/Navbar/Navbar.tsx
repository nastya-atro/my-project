import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import { createStyles, makeStyles, Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        paper:{
            marginBottom: theme.spacing(1),
            backgroundColor:'rgba(189, 189, 189, 0.233)'
        }
       
    }),
);

const Navbar = () => {
    const classes = useStyles();

    return (
        <div>
            <nav className={s.nav}>
                <Paper className={classes.paper}><div className={`${s.item}`}>
                <NavLink to="/profile" activeClassName={s.active}>
                    <i className="fas fa-house-user"></i>
                    <div>Profile</div>
                </NavLink>
            </div></Paper>
            
            <Paper className={classes.paper}>
            <div className={s.item}>
                
                <NavLink to="/users" activeClassName={s.active}>
                    <i className="fas fa-users"></i>
                    <div>Users</div></NavLink>
            </div></Paper>

            <Paper className={classes.paper}>
            <div className={s.item}>
                <NavLink to="/friendpage" activeClassName={s.active}>
                    <i className="fas fa-smile"></i>
                    <div>My Friends</div></NavLink>
            </div></Paper>

            <Paper className={classes.paper}>
            <div className={`${s.item}`}>
                <NavLink to="/chat" activeClassName={s.active}>
                    <div>Chat online</div>
                </NavLink>
            </div></Paper>

            <Paper className={classes.paper}>
            <div className={`${s.item}`}>
                <NavLink to="/dialog" activeClassName={s.active}>
                    <i className="fas fa-envelope"></i>
                    <div>Messages</div></NavLink>
            </div></Paper>
        </nav>
        </div>
    )
}


export default Navbar;