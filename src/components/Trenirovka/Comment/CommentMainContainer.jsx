import React from 'react';
import { addCommentActionCreator, changeCommentActionCreator } from '../../../Trenirovka.Store/comment-reducer';
import s from './../Trenirovka.module.css'
import CommentMain from './CommentMain';
import { connect } from 'react-redux';



let mapStateToProps = (state) => {
    return {
        comment: state.commentPage.comment,
        newCommentText: state.commentPage.newCommentText
    } 
}

let mapDispatchToProps = (dispatch) => {
    return {
        buttonCommentContainer: () => {
            dispatch(addCommentActionCreator())
        },
        commentChangeContainer: (comment) => {
            dispatch(changeCommentActionCreator(comment))
        }
    }
}


const CommentMainContainer = connect(mapStateToProps, mapDispatchToProps)(CommentMain)

export default CommentMainContainer;