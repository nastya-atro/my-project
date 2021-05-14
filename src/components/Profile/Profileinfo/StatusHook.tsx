import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './ProfileForm.module.css'


type PropsTypes={
    status:string
    updateStatus:(status: string)=>void
}

const StatusHook:React.FC<PropsTypes> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    
    useEffect(() => {
        setStatus(props.status)},
        [props.status]);

    let activateEditMode = () => {
        setEditMode(true)
    }
    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    let onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode}>{props.status || '----'}</span>
                </div>}
            {editMode &&
                <div className={s.status_input}>
                    <input type='text' onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>}
        </div>
    )
}

export default StatusHook