import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './Profileinfo.module.css'
import StatusHook from './StatusHook';

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader />
    }
    return (
        <div>
            
            
            <div className={s.description}>
                <div>{props.profile.fullName}</div>
                <img src={props.profile.photos.large}/>
                <div>
                    <StatusHook status={props.status} updateStatus={props.updateStatus}/>
                </div>
        </div>
        </div>
    )
}

export default ProfileInfo;