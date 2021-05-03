import React from 'react';
import s from './../Trenirovka.module.css'
import TRItem from './TRItem';
import TRDialog from './TRDialog';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormMessage from './MessageForm';





const DialogMain = (props) => {


    const submitMessage = (values, { setSubmitting }) => {

        props.buttonMessageContainer(values.newMessage);
        setSubmitting(false);

    }

    let dialogsElement = props.dialog.map((el) => (<TRItem name={el.name} userId={el.userId} />))
    let messagesElement = props.message.map((el) => (<TRDialog message={el.message} id={el.id} />))



    return (
        <div>
            <div>
                <div className={s.messages}>My Messages:</div>
            </div>

            <div className={s.dialog}>
                <div>{dialogsElement}</div>
                <div>{messagesElement}</div>

            </div>
            <div>

                <FormMessage submitMessage={submitMessage}/>
            </div>
        </div>
    )
}

export default DialogMain






