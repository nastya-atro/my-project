import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import UseR from './UseR';
import s from './Users.module.css'


let Users = (props) => {


    return <div>
        <Paginator currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalUsersCount={props.totalUsersCount}
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






