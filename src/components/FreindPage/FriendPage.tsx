import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import UserImg from './../../assets/images/user.png'
import s from './FriendPage.module.css'
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { unfollow } from '../../redux/usersReducer';
import { getFollowedUserThunk } from '../../redux/friendPageReducer';


type ValueFormType = {
    search: string
}

const FriendPage: React.FC = () => {
    const totalFriendCount = useSelector((state: AppStateType) => state.friendPage.totalFriendCount)
    const pageSize = useSelector((state: AppStateType) => state.friendPage.pageSize)
    const currentPage = useSelector((state: AppStateType) => state.friendPage.currentPage)
    const users = useSelector((state: AppStateType) => state.friendPage.users)
    const friend = useSelector((state: AppStateType) => state.friendPage.friend)
    const term = useSelector((state: AppStateType) => state.friendPage.term)

    const dispatch = useDispatch()

    const unfollowCallback = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const changePageFriends = (currentPage: number) => {
        dispatch(getFollowedUserThunk(currentPage, pageSize, friend, term))
    }


    useEffect(() => {
        dispatch(getFollowedUserThunk(currentPage, pageSize, friend, term))
    }, [])

    const searchFriend = (values: ValueFormType, { setSubmitting }: FormikHelpers<{ search: string }>) => {
        dispatch(getFollowedUserThunk(1, pageSize, true, values.search))
        setSubmitting(false);
    }
    return (
        <div className={s.friendsPage_wrapper}>
            <h3>My Friends</h3>
            <div>
                <Formik
                    initialValues={{ search: '' }}
                    onSubmit={searchFriend}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="search" />
                            <button type="submit" disabled={isSubmitting}>
                                Search
           </button>
                        </Form>
                    )}
                </Formik>



            </div>
            <div>
                <Paginator totalItemCount={totalFriendCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={changePageFriends}
                />
            </div>
            <div className={s.friendPage_flex}>{users.map(u =>
                <div className={s.friend_info}>

                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small || UserImg} alt="description"></img>
                        </NavLink>
                    </div>
                    <div className={s.friend_info_name}>{u.name}</div>
                    <div className={s.friend_info_status}>{u.status}</div>


                    <span className={s.friendButtonMessage}><NavLink to='./dialog'>Write message</NavLink></span>
                    <button className={s.friendButtonFollow} onClick={() => {
                        unfollowCallback(u.id)
                    }
                    }>Unfollow</button>
                </div>)
            }
            </div>
        </div>

    )
}

export default FriendPage