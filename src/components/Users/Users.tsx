import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, follow, unfollow } from '../../redux/usersReducer';
import { selectorCurrentPage, selectorFollowingInProgress, selectorFriend, selectorPageSize, selectorTotalUsersCount, selectorUsers } from '../../redux/usersSelector';
import Paginator from '../common/Paginator/Paginator';
import SearchFilter from './SearchFilter';
import UseR from './UseR';
import s from './Users.module.css'
import { selectorTerm } from './../../redux/usersSelector';
import { useHistory } from 'react-router';

type AdressType={
    term?: string
    friend?: string
    currentPage?:string
}

let Users: React.FC = () => {

    const currentPage = useSelector(selectorCurrentPage)
    const totalUsersCount = useSelector(selectorTotalUsersCount)
    const pageSize = useSelector(selectorPageSize)
    const users = useSelector(selectorUsers)
    const term = useSelector(selectorTerm)
    const friend = useSelector(selectorFriend)
    const followingInProgress = useSelector(selectorFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const queryString = require('query-string');
        const parsed = queryString.parse(history.location.search)

        let actualCurrentPage = currentPage
        let actualTerm = term
        let actualFriend = friend

        if (parsed.page)  actualCurrentPage = Number(parsed.page) 
        if (parsed.term)  actualTerm = parsed.term 

        switch (parsed.friend) {
            case 'null':
                actualFriend = null
                break
            case 'true':
                actualFriend = true
                break
            case 'false':
                actualFriend = false
                break
        }
        dispatch(getUsers(actualCurrentPage, pageSize, actualTerm, actualFriend))
    }, [])


    useEffect(() => {
        let adress:AdressType = {}

        if(term) adress.term =term
        if(friend !==null) adress.friend=String(friend)
        if(currentPage!==1) adress.currentPage=String(currentPage)

        const queryString = require('query-string');
        
        history.push({
            pathname: '/users',
            search: queryString.stringify(adress)
        })
    }, [term, friend, currentPage])

    const searchUsers = (term: string, friend: null | boolean) => {
        dispatch(getUsers(1, pageSize, term, friend))
    }
    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers(currentPage, pageSize, term, friend))
    }
    const followUser = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <div>
        <div>
            <SearchFilter searchUsers={searchUsers} />
        </div>
        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemCount={totalUsersCount}
            pageSize={pageSize} />
        <div className={s.users_wrapper}>
            {users.map(u => <div key={u.id}>
                <UseR user={u} follow={followUser} unfollow={unfollowUser}
                    followingInProgress={followingInProgress} />
            </div>)}
        </div>
    </div>
}


export default Users;






