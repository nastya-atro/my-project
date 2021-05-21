import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import { Formik, Form, FormikErrors } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { actions } from '../../../redux/profileReducer';
import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
  }),
);
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
    const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

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
        <Paper className={s.postsBlock}>
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
                        <Form onSubmit={handleSubmit} className={classes.root} autoComplete="off">
                            <div className={s.inputPostBlock}>
                                <Grid container justify="center">
                                    <Grid item><div className={s.inputPost}>
                                     <TextField id="standard-textarea" multiline
                                        onChange={handleChange} onBlur={handleBlur} type="textarea" name="newPostText"
                                        placeholder='Write new post here...' />
                                    <div className={s.error}>{errors.newPostText && touched.newPostText && errors.newPostText}</div>
                                </div></Grid>
                                    <Grid item>
                                        <div className={s.buttonPost}>
                                        <Button type="submit" disabled={isSubmitting} variant="contained" > Add post </Button>
                                </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>               
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>{postElement}</Grid>
                    </Grid>             
            </div>
        </Paper>
    )
}

export default MyPosts