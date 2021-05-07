import React from 'react';
import s from './Post.module.css'
import UserPhoto from './../../../../assets/images/user.png'

const Post = (props) => {
    return (
       
            <div className={s.postBlock}>
              

              <div className={s.postBlock_img}>
                <div className={s.img}>
                <img src={UserPhoto}></img>
                </div>
                
              
              <div className={s.name}>Nastya Atroshenko</div>
              <div className={s.time}>01.04.22</div>
              
              
              </div>

              <div className={s.postBlock_post}>{props.message}</div>

                <div className={s.postBlock_likes}>
                    <span><i class="fas fa-heart"></i>  {props.likesNumber}</span>
                    <span><i class="fas fa-comments"></i> {props.likesNumber}</span>
                </div>
                
                </div>
           


    )
}
 
export default Post;

