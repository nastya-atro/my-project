import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
       
            <div className={s.item}>
              <img src="https://img3.goodfon.ru/wallpaper/nbig/4/99/neytiri-avatar.jpg"></img>  
                {props.message}
                <div>
                    <span>{props.likesNumber}</span>
                </div>
                
                </div>
           


    )
}

export default Post;

