import React from 'react';
import s from './Post.module.css'
import UserImg from './../../../../assets/images/user.png'
import { ProfileType } from '../../../../types/types';

type PropsTypes={
  profile: ProfileType|null
  message: string
  likesNumber: number
}

const Post:React.FC<PropsTypes> = (props) => {
  return (
    <div className={s.postBlock}>
      <div className={s.postBlock_img}>
        <div className={s.img}>
          <img src={!props.profile ? UserImg:props.profile.photos.small ||UserImg} alt="description"></img>
        </div>
        <div className={s.name}>{!props.profile ? 'Users Name' : props.profile.fullName}</div>
        <div className={s.time}>{new Date().toLocaleDateString()}</div>
      </div>
      <div className={s.postBlock_post}>{props.message}</div>
      <div className={s.postBlock_likes}>
        <span><i className="fas fa-heart"></i>  {props.likesNumber}</span>
        <span><i className="fas fa-comments"></i> {props.likesNumber}</span>
      </div>
    </div>
  )
}

export default Post;

