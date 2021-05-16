import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import UserImg from './../../assets/images/user.png'
import s from './FriendPage.module.css'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType={
    totalFriendCount: number
    pageSize : number
    currentPage: number
    changePageFriends:(pageNumber:number)=>void
    users: Array<UserType>
    unfollow:(userId:number)=>void


}

const FriendPage:React.FC<PropsType> = (props) => {


    return (<div className={s.friendsPage_wrapper}>
        <h3>My Friends</h3>
        <div>
            <Paginator totalItemCount={props.totalFriendCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.changePageFriends}
            />
        </div>
        <div className={s.friendPage_flex}>{props.users.map(u =>
            <div className={s.friend_info}>

                <div>
                    <NavLink to={'/profile/'+u.id}>
                    <img src={u.photos.small || UserImg} alt="description"></img>
                    </NavLink>
                    </div>
                <div className={s.friend_info_name}>{u.name}</div>
                <div className={s.friend_info_status}>{u.status}</div>


                <span className={s.friendButtonMessage}><NavLink to='./dialog'>Write message</NavLink></span>
                <button className={s.friendButtonFollow} onClick={() => {
                    props.unfollow(u.id)
                }
                }>Unfollow</button>
            </div>)
        }
        </div>
    </div>

    )
}

export default FriendPage