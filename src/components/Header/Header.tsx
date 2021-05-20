import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Logo from './../../assets/images/logo.png'
import UserImg from './../../assets/images/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { logout } from '../../redux/authReducer';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      }

})
)

const Header: React.FC = () => {
    const classes = useStyles();

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout)
    }


    return ( 



        <header className={s.header}>
            <img src={Logo} alt="description"></img>
            <div className={s.loginBlock}>
                {isAuth ?
                    <div className={s.loginBlock_logout}>
                        <span className={s.userImg}><img src={
                            UserImg
                        } alt="description" ></img></span>
                        <span className={s.login}>{login}</span>
                        <span className={s.buttonLogout}><button onClick={logoutCallback}>Log out</button> </span>
                    </div> :
                    <div className={s.buttonLogin}>
                        <NavLink to={'/login'}>
                            Log in
                    </NavLink></div>}
            </div>
        </header>
   
    )
}

export default Header