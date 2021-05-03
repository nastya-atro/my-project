import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Textarea } from './../../common/FormControls/FormControls';
import { required, validateForm, maxLength } from './../../../utils/validators/validators';

const maxLength10=maxLength(10)

const FormMessage = (props) => {
    return (
        <Formik
            initialValues={{ newMessage: 'pp' }}
            validate={validateForm}
            onSubmit={props.submitMessage}
        >
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name="newMessage" value={values.newMessage} component={Textarea} onChange={handleChange} onBlur={handleBlur} />
                    <div>
                        <button type="submit" disabled={!isValid || isSubmitting}>
                            Submit
           </button>
                    </div>
                </Form>
            )}
        </Formik>

    )
}

export default FormMessage