import React from 'react';
import StatusHook from './StatusHook';
import s from './ProfileForm.module.css'
import { ContactsType, ProfileType } from '../../../types/types';

type PropsTypes={
    profile: ProfileType
    status: string
    updateStatus:(status: string)=>void
    isOwner:boolean
    changeEditMode:()=>void

}

const ProfileForm:React.FC<PropsTypes> = (props) => {
    return (
        <div>

            <div>
                <div className={s.form_block_name_status}>
                    <div className={s.fullName}>{props.profile.fullName}</div>
                    <div className={s.status}>
                        <StatusHook status={props.status} updateStatus={props.updateStatus} />
                    </div>
                </div>
                <div className={s.form_block_job_contacts}>
                    {props.isOwner &&
                        <button className={s.button_edit} onClick={props.changeEditMode}>Edit profile</button>
                    }
                    <div className={s.aboutMe}>
                        <h3>About me:</h3>
                        {props.profile.aboutMe || '--'}
                    </div>
                    <div className={s.job}>
                        <h3>Info for my job:</h3>
                        <div> <b>Searching a job:</b>{props.profile.lookingForAJob ? "yes" : "no"}</div>
                        <div><b>Professional skils:</b>{props.profile.lookingForAJobDescription}</div>
                    </div>
                    <div className={s.contacts}><h3>My contacts:</h3>
                        {Object.keys(props.profile.contacts as ContactsType).map(key => {
                            return <Contact key={key} contactTitle={key} 
                            contactValue={!props.profile.contacts?'-': props.profile.contacts[key as keyof ContactsType]} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
} 

type ContactPropsType={
    contactTitle: string
    contactValue: string
}

const Contact:React.FC<ContactPropsType> = ({ contactTitle, contactValue })=> {
    return <div><b>{contactTitle}</b> {contactValue || "-"} </div>
}


export default ProfileForm