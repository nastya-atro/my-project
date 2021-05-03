import React, { useEffect, useState } from 'react';

const StatusHook = (props) => {

    let [editMode, setEditMode]=useState(false)
    let [status, setStatus]=useState(props.state)

    useEffect(()=>{
        setStatus(props.status)
    },
    [props.status]
    );

    let activateEditMode=()=>{
        setEditMode(true)
    }

    let deactivateEditMode=()=>{
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange=(e)=>{
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
                <div>
                    <span  onClick={activateEditMode}>{props.status ||'----'}</span>
                </div>}
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>}

        </div>
    )
}

export default StatusHook