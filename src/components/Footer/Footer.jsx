import React from 'react';
import s from './Footer.module.css'

const Footer = (props) => {
    return (
        <div className={s.footer}>
            <div className={s.footer_contacts}>
                <div className={s.create}>Created by:</div>
                <div>Anastasiya Atroshchenko</div>
                <div>
                    <i className="fab fa-linkedin"></i>
                    <span> linkedin.com/in/bellenastya</span>
                </div>
            </div>
        </div>
    )
}

export default Footer