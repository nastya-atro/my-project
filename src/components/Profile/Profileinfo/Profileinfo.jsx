import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './Profileinfo.module.css'
import UserPhoto from '../../../assets/images/user.img'
import ProfileForm from './ProfileForm';
import ProfileFormChange from './ProfileFormChange';


const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)


    if (!props.profile) {
        return <Preloader />
    }

    let changePhoto = (e) => {
        if (e.target.files.length) {
            props.putPhotos(e.target.files[0])
        }
    }

    let changeEditMode = () => {
        setEditMode(true)
    }

    let saveForm = (values, { setSubmitting }) => {

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
                    <img src={props.profile.photos.large || UserPhoto} className={s.photo} />
                    <div className={s.editPhoto}>

                        {props.isOwner &&
                            <input className={s.editPhoto_input} type={'file'} id={"input__file"} onChange={changePhoto}></input>}
                        <label className={s.editPhoto_label} for="input__file"><i class="fas fa-camera-retro"></i></label>
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