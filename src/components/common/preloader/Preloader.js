import React from 'react';
import preloader from './../../../assets/images/preloader.gif'


let Preloader = (props)=>{
    return (
        <img src={preloader} style={{width: 50, height: 50}}/>
    )
}

export default Preloader

