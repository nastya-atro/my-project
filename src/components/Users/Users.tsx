import React from 'react';
import { UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import UseR from './UseR';
import s from './Users.module.css'

type PropsType={
    currentPage: number
    onPageChanged:(currentPage:number)=>void
    totalUsersCount:number
    pageSize:number
    users: Array<UserType>
    follow:(userId: number)=>void
    unfollow:(userId: number)=>void
    followingInProgress: Array<number>
}

let Users:React.FC<PropsType>= (props) => {
    return <div>
        <Paginator currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalItemCount={props.totalUsersCount}
            pageSize={props.pageSize} />
        <div className={s.users_wrapper}>
            {props.users.map(u => <div key={u.id}>
                <UseR user={u} follow={props.follow} unfollow={props.unfollow}
                    followingInProgress={props.followingInProgress} />
            </div>)}
        </div>
    </div>
}

export default Users;






