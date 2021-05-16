import React from 'react';
import { Formik, Form, Field, FormikErrors} from 'formik';
import {  useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router';
import s from './LoginPage.module.css';
import { AppStateType } from '../../redux/redux-store';






type ValuesType={
    email:string
    password:string
    captcha: string 
    checkbox: any
}
//type ValuesTypeKeys= Extract<keyof ValuesType, string>



const validateForm = (values:ValuesType) => {
    const errors:FormikErrors<ValuesType>={};
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

const LoginPage:React.FC = () => {

const isAuth=useSelector((state:AppStateType)=>{return state.auth.isAuth})
const captcha=useSelector((state:AppStateType)=>{return state.auth.captcha})

const dispatch=useDispatch()


    const submit = (values:ValuesType, onSubmitProps:any) => {
        dispatch(login(values.email, values.password, values.checkbox, values.captcha))
        onSubmitProps.setSubmitting(false);
    }
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div className={s.login_wrapper}>
            <h1>Welcome to Chevos'ka social network !</h1>
            <div>
                <Formik
                    initialValues={{ email: '', password: '', checkbox: 'true', captcha:'' }}
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
                        <div className={s.loginForm}>
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <Field onChange={handleChange} onBlur={handleBlur} type="email" name="email" placeholder="Login" value={values.email} />
                                    <div className={s.error}> {errors.email && touched.email && errors.email}</div>
                                </div>
                                <div>
                                    <Field onChange={handleChange} onBlur={handleBlur} type="password" name="password" placeholder="Password" value={values.password} />
                                    <div className={s.error}>{errors.password && touched.password && errors.password} </div>
                                </div>
                                <div className={s.checkbox}>
                                    <Field onChange={handleChange} type="checkbox" name="checkbox" /> remember me
                        </div>
                                
                                {captcha && <img src={captcha} alt="description" />}
                                {captcha && <Field onChange={handleChange} type="text" name="captcha" />}
                                <div className={s.buttonLogin}>
                                    <button type="submit" disabled={!isValid || isSubmitting}>
                                        Log in
           </button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage