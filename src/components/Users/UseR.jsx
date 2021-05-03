import React from 'react';
import s from './Users.module.css'
import userPhto from '../../assets/images/user.img'
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';


let UseR = ({user, followingInProgress, follow, unfollow}) => {
let u=user;

    return (
        <div >
            <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhto} className={s.userPhoto}></img>
                    </NavLink>

                </div>
                <div>
                    {u.followed
                        ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                            unfollow(u.id)

                        }

                        }>Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                            follow(u.id)

                        }


                        }>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>

    )
}



export default UseR;






