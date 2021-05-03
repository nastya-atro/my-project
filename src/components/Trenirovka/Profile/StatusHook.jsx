import React, { useState } from 'react';


const StatusTHook=(props)=> {
    let [editMode, setEditMode]=useState(false)
    let [status, setStatus]=useState(props.status)

    let activateEditMode=()=>{
        setEditMode(true)
    }

    let deactivateEditMode=()=>{
        setEditMode(false)
        props.updateStatusThunk(status)
    }

    let changeStatus=(e)=>{
        setStatus(e.currentTarget.value)
    }



   
        return (
            <div>
                {!editMode &&
                    <div>
                        <span onClick={activateEditMode}>{props.status || 'no status'}</span>
                    </div>
                }

                {editMode &&
                    <div>
                        <input onChange={changeStatus} onBlur={deactivateEditMode} type='text' value={status}></input>
                    </div>
                }



            </div>
        )
    }




export default StatusTHook