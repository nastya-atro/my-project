import React, { ChangeEvent, useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './Profileinfo.module.css'
import UserPhoto from '../../../assets/images/user.png'
import ProfileForm from './ProfileForm';
import ProfileFormChange from './ProfileFormChange';
import {ProfileType } from '../../../types/types';

type PropsTypes={
    profile: ProfileType
    putPhotos:(photos: File)=>void
    changeProfile:(profile: ProfileType)=>void
    isOwner:boolean
    status:string
    updateStatus:(status: string)=>void
}


const ProfileInfo:React.FC<PropsTypes> = (props) => {
    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }
    let changePhoto = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.putPhotos(e.target.files[0])
        }
    } 
    let changeEditMode = () => {
        setEditMode(true)
    }
    let saveForm = (values:ProfileType, { setSubmitting }:any) => {
        props.changeProfile(values);
        setEditMode(false)
        setSubmitting(false);
    }

    return (
        <div>
            <div className={s.description}>
                <div className={s.backgroundImg}>
                </div>
                <div className={s.editPhoto_Wrapper}>
                    <img src={!props.profile.photos?UserPhoto:props.profile.photos.large || UserPhoto} className={s.photo} alt="description" />
                    <div className={s.editPhoto}>
                        {props.isOwner &&
                            <input className={s.editPhoto_input} type={'file'} id={"input__file"} onChange={changePhoto}></input>}
                        <label className={s.editPhoto_label} htmlFor="input__file"><i className="fas fa-camera-retro"></i></label>
                    </div>
                </div>
                <div className={s.form_wrapper}>
                    {!editMode ? <ProfileForm status={props.status} updateStatus={props.updateStatus} changeEditMode={changeEditMode} profile={props.profile} isOwner={props.isOwner} />
                        : <ProfileFormChange profile={props.profile} saveForm={saveForm} />}
                </div>
            </div>
        </div>
    )
}


export default ProfileInfo;