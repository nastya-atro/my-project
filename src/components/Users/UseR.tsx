import React from 'react';
import s from './Users.module.css'
import userPhto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType={
    user: UserType
    followingInProgress:Array<number>
    follow:(userId: number)=>void
    unfollow:(userId: number)=>void
}

let UseR:React.FC<PropsType>= ({ user, followingInProgress, follow, unfollow }) => {
    let u = user;
    return (
        <div className={s.user_wrapper}>
            <div className={s.user_photo}>
                <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small != null ? u.photos.small : userPhto} alt="description"></img>
                </NavLink>
            </div>
            <div className={s.user_name}>
                <div>{u.name}</div>
            </div>
            <div className={s.user_button}>
                {u.followed 
                    ? <button className={s.user_buttonUnfollow} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                        unfollow(u.id)
                    }
                    }>Unfollow</button>
                    : <button className={s.user_buttonFollow} disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                        follow(u.id)
                    }
                    }>Follow</button>}
            </div>
        </div>
    )
}

export default UseR;






