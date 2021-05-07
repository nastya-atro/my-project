import React from 'react';
import s from './Users.module.css'
import userPhto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';


let UseR = ({ user, followingInProgress, follow, unfollow }) => {
    let u = user;

    return (
        <div className={s.user_wrapper}>
            
                <div className={s.user_photo}>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhto}></img>
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






