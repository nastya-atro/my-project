import React from 'react';
import s from './../Trenirovka.module.css'
import { addPostActionCreator, changePostActionCreator } from '../../../Trenirovka.Store/post-reducer';
import PostMain from './PostMain';
import { connect } from 'react-redux';


let mapStateToProps=(state)=>{
    return{
        post: state.postPage.posts,
        newPostText: state.postPage.newPostText
    }
}

let mapDispatchToProps=(dispatch)=>{
    return{
        postChangeContainer:(post)=>{
            dispatch(changePostActionCreator(post))
        },
        buttonPostContainer:()=>{
            dispatch(addPostActionCreator())
        }

    }
}

const PostMainContainer=connect(mapStateToProps, mapDispatchToProps)(PostMain)

export default PostMainContainer;