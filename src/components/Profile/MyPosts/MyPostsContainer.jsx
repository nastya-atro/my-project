import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';


let mapSetToProps =(state)=>{
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        addPost: (newPostText)=> {
            dispatch(addPostActionCreator(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapSetToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer