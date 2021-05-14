import React from 'react';
import s from './../Dialog.module.css'

const Message = (props) => {
    return (
        <div className={s.dialogMessage}>
            <div className={s.dialog_topItem}>
                <div>{props.name}</div>
                <div><img src={props.photo} alt="description"></img></div>
                <div>{props.time}</div>
            </div>
            <div className={s.doalog_bottomItem}>{props.message} </div>
        </div>
    )
}

export default Message;