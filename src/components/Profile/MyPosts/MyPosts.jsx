import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import { Formik, Form, Field } from 'formik';

const validateForm = values => {
    const errors = {};
    if (values.newPostText.length > 50) {
        errors.newPostText = 'Please write maximum 50 simbols';
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

    let postElement = props.posts.map(el => <Post message={el.message} key={el.id} likesNumber={el.likesNumber} />)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
               
                <Formik
                    initialValues={{ newPostText: 'add new post'}}
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
                            <div>
                                <Field onChange={handleChange} onBlur={handleBlur} type="textarea" name="newPostText" value={values.newPostText} />
                                {errors.newPostText && touched.newPostText && errors.newPostText}
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                            Add post
           </button>
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