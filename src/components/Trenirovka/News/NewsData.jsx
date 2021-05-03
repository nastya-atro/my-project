import React from 'react';
import s from './News.module.css'

const NewsData = (props) => {




    return (
        <div className={s.news}>

            <div className={s.data}>
                <div>{props.name}</div>
                <div>{props.data}</div>
            </div>

            <div className={s.news}>
                <div>{props.news}</div>
            </div>
            
        </div>
    )

            
}

export default NewsData;