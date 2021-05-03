import React from 'react';
import News from './News';
import { connect } from 'react-redux';
import { addNewsActionCreator, changeNewsActionCreator } from '../../../redux/newsReducer';

let mapStateToProps=(state)=>{
    return{
        news: state.newsPage.newsPage,
        newsTextInitial: state.newsPage.newsTextInitial

    }
}

let mapDispatchToProps=(dispatch)=>{
    return{
        changeNewsContainer: (newsText)=>{
            dispatch(changeNewsActionCreator(newsText))
        },
        addNewsContainer: ()=>{
            dispatch(addNewsActionCreator())
        }
        
    }
}

const NewsContainer=connect(mapStateToProps, mapDispatchToProps)(News)
export default NewsContainer