import React from 'react';
import s from './Dialog.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './MessageItem/MessageItem';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { DialogsType, MessagesType } from '../../types/types';


 const validateForm = (values:ValuesFormType) => {
    let errors:FormikErrors<ValuesFormType> = {};
    if (!values.newMessage) {
      errors.newMessage = 'Required';
    } else if (
        values.newMessage.length>50
    ) {
      errors.newMessage = 'Please, dont write more then 50 sumbols';
    }
    return errors;
  }

type PropsType={
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    sendMessageBody:(newMessage:string)=>void
}

type ValuesFormType={
    newMessage: string
}

const Dialog:React.FC<PropsType> = (props) => {

    const addNewMessage = (values:ValuesFormType, { setSubmitting }:any) => {
        props.sendMessageBody(values.newMessage)
        setSubmitting(false);
    }
    let dialogElement = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} photo={d.photo} />)
    let messageElement = props.messages.map(m => <Message photo={m.photo} name={m.name} time={m.time} message={m.message} key={m.id} />)

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
                                    <Field className={errors.newMessage && touched.newMessage ? s.errorform : ""} component="textarea" onChange={handleChange} onBlur={handleBlur}
                                        placeholder="Write your message" name="newMessage" value={values.newMessage} />
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