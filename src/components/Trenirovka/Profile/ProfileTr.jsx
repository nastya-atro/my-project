import React from 'react';
import Preloader from '../../common/preloader/Preloader';

import StatusTHook from './StatusHook';

const ProfileTr=(props)=>{

    if(!props.profile){
        return( <Preloader/>) }
    return (
        <div>
            <StatusTHook status={props.status} 
            updateStatusThunk={props.updateStatusThunk}/>
           <div>{props.profile.fullName}</div>
           <div><img src={props.profile.photos.large}></img></div>
           <div>{props.profile.aboutMe}</div>
        </div>
    )
}

export default ProfileTr