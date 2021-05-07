import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import Logo from './../../assets/images/logo.png'
import UserImg from './../../assets/images/user.png'

const Header = (props) => {
    debugger
    return (
        <header className={s.header}>
            <img src={Logo}></img>



            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div className={s.loginBlock_logout}>
                        <span className={s.userImg}><img src={UserImg} ></img></span>
                        <span className={s.login}>{props.login}</span>
                        <span className={s.buttonLogout}><button onClick={props.logout}>Log out</button> </span>
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