import React from 'react';
import preloader from './../../../assets/images/spinner.gif'
import s from './Preloader.module.css'

let Preloader = (props)=>{
    return (
        <div className={s.preloader_wrapper}><img src={preloader} alt="description"/></div>
    )
}

export default Preloader

