import React from 'react';
import s from './../Trenirovka.module.css'
import { NavLink } from 'react-router-dom';

const TRItem = (props) => {
    let path = '/trenirovka/' + props.userId
    return (
        
            <div className={s.item}>
                <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
            </div>
           
     
    )
}

export default TRItem

