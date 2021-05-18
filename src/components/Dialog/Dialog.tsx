import React from 'react';
import s from './Dialog.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './MessageItem/MessageItem';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { actions } from '../../redux/dialogReducer';


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


type ValuesFormType={
    newMessage: string
}

const DialogPage:React.FC = () => {

    const dialogs=useSelector((state:AppStateType)=>state.messagesPage.dialogs)
    const messages=useSelector((state:AppStateType)=>state.messagesPage.messages)
    const dispatch=useDispatch()
    const sendMessageBody=(newMessage: string)=>{
        dispatch(actions.sendMessageBody(newMessage))
    }

    const addNewMessage = (values:ValuesFormType, { setSubmitting }:any) => {
        sendMessageBody(values.newMessage)
        setSubmitting(false);
    }
    let dialogElement = dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} photo={d.photo} />)
    let messageElement = messages.map(m => <Message photo={m.photo} name={m.name} time={m.time} message={m.message} key={m.id} />)

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

export default DialogPage;