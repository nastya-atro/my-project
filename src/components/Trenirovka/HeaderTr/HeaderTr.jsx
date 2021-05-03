import React from 'react';
import s from './HeaderTr.module.css';
import { NavLink } from 'react-router-dom';



const HeaderTr = (props) => {
    return (
        <header className={s.header}>
            <img src="https://im0-tub-by.yandex.net/i?id=d02d6f6d33ba5d8e696cfc80e3f20e14&n=13"></img>
            <div className={s.loginBlock}>
                {!props.isAuth ? 
               <NavLink to={'/login'}><button>Login</button> </NavLink> 
                : props.login}
                 </div>
        </header>
    )
}

export default HeaderTr