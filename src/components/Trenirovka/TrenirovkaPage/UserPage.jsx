import React from 'react';

const UserPage=(props)=>{
  
    return(
      <div>{props.users.map(u=><div>
            <div>{u.name}</div>
            <div>{u.status}</div>
            <div><img src={u.photo}></img></div>
        </div>
       )
       }</div>
    )
}

export default UserPage