import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialog.module.css'

type PropsType={
    photo: string
    name: string
    id: number
}

const DialogItem:React.FC<PropsType> =(props)=>{
    let path = "/dialog/"+props.id;
    return (
        <div className={s.dialog}>
                    <NavLink to={path} activeClassName={s.active}>
                    <img src={props.photo} alt="description"></img>
                   <div className={s.name}> {props.name}</div>
                    </NavLink>
                </div>
    )
}

export default DialogItem;