import React from 'react';
import { Formik, Form, Field } from 'formik';
import s from './ProfileFormChange.module.css'
import { ContactsType, ProfileType } from '../../../types/types';

type PropsTypes={
    profile: ProfileType
    saveForm:(values: any, { setSubmitting }: { setSubmitting: any; })=>void
}



const ProfileFormChange:React.FC<PropsTypes> = (props) => {

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: props.profile.fullName,
                    lookingForAJobDescription: props.profile.lookingForAJobDescription || '--',
                    aboutMe: props.profile.aboutMe
                }}
                onSubmit={props.saveForm}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={s.formChange_wrapper}>
                            <h3>About me:</h3>
                            <div>
                                <b>My full name</b>
                                <Field type="text" name="fullName" value={values.fullName} />
                            </div>
                            <div>
                                <b>My interesting</b>
                                <Field type="textarea" name="aboutMe" value={values.aboutMe} />
                            </div>
                            <div>
                                <h3>My job:</h3>
                                <div> <b>Searching a job</b>
                                    <Field type="checkbox" name="lookingForAJob" />
                                </div>
                                <div><b>Professional skils</b>
                                    <Field type="textarea" name="lookingForAJobDescription" value={values.lookingForAJobDescription} />
                                </div>
                            </div>
                            <div className={s.contacts}><h3>My contacts:</h3>
                                {Object.keys(props.profile.contacts as ContactsType).map(key => {
                                    return (<div>
                                        <b>{key}</b>  <div><Field key={key} type="text" placeholder={key} name={"contacts." + key} 
                                        value={!props.profile.contacts?'-': props.profile.contacts[key as keyof ContactsType]} />
                                        </div></div>)
                                })}
                            </div>
                            <button className={s.buttonSave} type="submit" disabled={isSubmitting}>
                                Save
           </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileFormChange