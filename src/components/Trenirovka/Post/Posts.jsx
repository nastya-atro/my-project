import React from 'react';
import s from './../Trenirovka.module.css'

const Posts = (props) => {
    return (
        <div>

            <div className={s.namePost}>{props.name}</div>

            <div className={s.avatar}>
                <img src={props.avatar}></img>
            </div>
            
            <div>
                {props.post} <span className={s.likes}>{props.likesCount} likes</span>
            </div>

        </div>
    )
}


export default Posts