import React from 'react';
import s from './Dialog.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './MessageItem/MessageItem';
import { Formik, Form, Field } from 'formik';

import {validateForm } from './../../utils/validators/validators';

{/*const validateForm = values => {
    const errors = {};
    if (values.newMessage.length > 50) {
        errors.newMessage = 'Please write maximum 50 simbols';
    } else if (
        values.newMessage.length < 1
    ) {
        errors.newMessage = 'You can not send an empty message'
    }
    return errors;
}*/}

const Dialog = (props) => {

    const addNewMessage = (values, { setSubmitting }) => {
     
            props.sendMessageBody(values.newMessage)
            setSubmitting(false);
       
    }

    let state = props.messagesPage;

    let dialogElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} photo={d.photo} />)
    let messageElement = state.messages.map(m => <Message photo={m.photo} name={m.name} time={m.time} message={m.message} key={m.id} />)
    

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElement} 
            </div>
            <div className={s.messages}>
                {messageElement}
                <div>



                    <Formik
                        initialValues={{ newMessage: '' }}
                        validate={validateForm}
                        
                        onSubmit={addNewMessage}
                    >
                        {({ values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting }) => (
                                <div className={s.messageForm}>
                                     <Form onSubmit={handleSubmit}>
                                <Field  className={errors.newMessage && touched.newMessage ? s.errorform : ""} component="textarea" onChange={handleChange} onBlur={handleBlur}
                                 placeholder="Write your message" name="newMessage" value={values.textarea}/>
                                
                                {errors.newMessage && touched.newMessage && <div className={s.error}>{errors.newMessage}</div>}
                                <div className={s.messageButton}>
                                    <button type="submit" disabled={isSubmitting}>
                                        Send messages
                                    </button>
                                </div>
                            </Form>
                                </div>
                           
                        )}
                    </Formik>





                </div>
            </div>
        </div>
    )
}

export default Dialog;