import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';


const Navbar = () => {
    return (
        <nav className={s.nav}>

            <div className={`${s.item}`}>
                <NavLink to="/profile" activeClassName={s.active}>
                    <i class="fas fa-house-user"></i>
                    <div>Profile</div>

                </NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/users" activeClassName={s.active}>
                    <i class="fas fa-users"></i>
                    <div>Users</div></NavLink>
            </div>

            <div className={`${s.item}`}>
                <NavLink to="/dialog" activeClassName={s.active}>
                    <i class="fas fa-envelope"></i>
                    <div>Messages</div></NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/music" activeClassName={s.active}>
                    <i class="fas fa-headphones-alt"></i>
                    <div>Music</div></NavLink>
            </div>

            <div className={s.item}>
                <NavLink to="/setting" activeClassName={s.active}>
                    <i class="fas fa-sliders-h"></i>
                    <div>Setting</div></NavLink>
            </div>







        </nav>
    )
}


export default Navbar;