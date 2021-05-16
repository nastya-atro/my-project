import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import { Formik, Form, Field, FormikErrors } from 'formik';
import { PostsType, ProfileType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { actions } from '../../../redux/profileReducer';



const validateForm = (values: ValuesFormType) => {
    const errors: FormikErrors<ValuesFormType> = {};
    if (values.newPostText.length > 700) {
        errors.newPostText = 'Please write maximum 700 simbols';
    } else if (
        values.newPostText.length < 1
    ) {
        errors.newPostText = 'You can not send an empty message'
    }
    return errors;
}

type ValuesFormType = {
    newPostText: string
}


const MyPosts: React.FC = () => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)

    const dispatch = useDispatch()

    const addPost = (newPostText: string) => {
        dispatch(actions.addPost(newPostText))
    }

    const addNewPostForm = (values: ValuesFormType, { setSubmitting }: any) => {
        addPost(values.newPostText)
        setSubmitting(false);
    }
    
    let postElement = posts.map(el => <Post profile={profile} message={el.message} key={el.id} likesNumber={el.likesNumber} />)

    return (
        <div className={s.postsBlock}>
            <h3>My blog</h3>
            <div>
                <Formik
                    initialValues={{ newPostText: '' }}
                    validate={validateForm}
                    onSubmit={addNewPostForm}
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