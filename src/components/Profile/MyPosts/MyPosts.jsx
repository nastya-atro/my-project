import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import { Formik, Form, Field } from 'formik';

const validateForm = values => {
    const errors = {};
    if (values.newPostText.length > 700) {
        errors.newPostText = 'Please write maximum 700 simbols';
    } else if (
        values.newPostText.length < 1
    ) {
        errors.newPostText = 'You can not send an empty message'
    }

    return errors;
}


const MyPosts = (props) => {

    const addNewPost = (values, { setSubmitting }) => {

        props.addPost(values.newPostText)
        setSubmitting(false);

    }

    let postElement = props.posts.map(el => <Post profile={props.profile} message={el.message} key={el.id} likesNumber={el.likesNumber} />)

    return (
        <div className={s.postsBlock}>
            <h3>My blog</h3>
            <div>

                <Formik
                    initialValues={{ newPostText: '' }}
                    validate={validateForm}
                    onSubmit={addNewPost}
                >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,

                        isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className={s.inputPostBlock}>
                                <div className={s.inputPost}>
                                    <Field component="textarea" 
                                    onChange={handleChange} onBlur={handleBlur} type="textarea" name="newPostText" 
                                    placeholder='Write new post here...' />
                                    <div className={s.error}>{errors.newPostText && touched.newPostText && errors.newPostText}</div>
                                </div>
                                <div className={s.buttonPost}>
                                    <button type="submit" disabled={isSubmitting}> Add post </button>
                                </div>
                            </div>


                        </Form>
                    )}
                </Formik>

            </div>
            <div>
                <div className={s.posts}>
                    {postElement}
                </div>


            </div>


        </div>
    )
}

export default MyPosts