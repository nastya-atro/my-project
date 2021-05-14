import React from 'react';
import s from './FormControls.module.css'

export const Textarea = (props) => {
    let error = props.form.errors.newMessage && props.form.touched.newMessage;
    return (<div className={error && s.error}>
        <div>
            <textarea {...props.field} />
        </div>
        {error && <span>{props.form.errors.newMessage}</span>}

    </div>
    )
}
