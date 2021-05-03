import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://im0-tub-by.yandex.net/i?id=d02d6f6d33ba5d8e696cfc80e3f20e14&n=13"></img>
            <div className={s.loginBlock}>
                { props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>:
                <NavLink to={'/login'}> 
                    Login
                    </NavLink>}
                </div>
        </header>
    )
}

export default Header