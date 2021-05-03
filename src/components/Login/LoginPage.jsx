import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { login, stopSubmit } from '../../redux/authReducer';
import { Redirect } from 'react-router';
import s from './LoginPage.module.css';

const validateForm = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be more then 6 characters'
    }

    return errors;
}


const Login = (props) => {
    const submit = (values, onSubmitProps) => {

        props.login(values.email, values.password, values.checkbox)
        onSubmitProps.setSubmitting(false);

    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }


    return (
        <div>
            <h1>Login</h1>

            <div>
                <Formik
                    initialValues={{ email: '', password: '', checkbox: 'true' }}
                    validate={validateForm}
                    onSubmit={submit}
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
                            <div>
                                <Field onChange={handleChange} onBlur={handleBlur} type="email" name="email" placeholder="Login" value={values.email} />
                                {errors.email && touched.email && errors.email}
                            </div>
                            <div>
                                <Field onChange={handleChange} onBlur={handleBlur} type="password" name="password" placeholder="Password" value={values.password} />
                                {errors.password && touched.password && errors.password}
                            </div>
                            <div>
                                <Field onChange={handleChange} type="checkbox" name="checkbox" /> remember me

                        </div>
                       {/*<div className={s.someerror}>{props.error}</div>*/} 

                            <button type="submit" disabled={!isValid || isSubmitting}>
                                Submit
           </button>
                        </Form>
                    )}
                </Formik>
            </div>



        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    error: state.auth.error
    }
    
}

export default connect(mapStateToProps, {login})(Login)
