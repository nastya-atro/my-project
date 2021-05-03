import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';


const Navbar = () => {
    return (
        <nav className={s.nav}>

            <div className={`${s.item}`}>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>

            <div className={`${s.item}`}>
                <NavLink to="/dialog" activeClassName={s.active}> Messages</NavLink>
            </div>

            

            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.active}>Music</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/setting" activeClassName={s.active}>Setting</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/trenirovka" activeClassName={s.active}>Trenirovka</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/news" activeClassName={s.active}>News</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/userstrenitovka" activeClassName={s.active}>UsersTr</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/profiletrenirovka" activeClassName={s.active}>ProfileTr</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/userpage" activeClassName={s.active}>UserPage</NavLink>
            </div>


        </nav>
    )
}


export default Navbar;