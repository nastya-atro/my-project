import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import UseR from './UseR';

 
let Users = (props) => {


    return <div>
        <Paginator currentPage={props.currentPage} 
        onPageChanged={props.onPageChanged} 
        totalUsersCount={props.totalUsersCount} 
        pageSize={props.pageSize}/>

        {props.users.map(u => <div key={u.id}>
                <UseR user={u} follow={props.follow} unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}/>
            </div>)}
    </div>

}



export default Users;






