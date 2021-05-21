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
import { InputBase, makeStyles, createStyles, Theme, fade, NativeSelect, Button, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        container: {
            align: 'center'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        button: {
            marginTop: 10,
            marginLeft: 30
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        }
    }),
);

type ValueFormType = {
    search: string
}

const FriendPage: React.FC = () => {
    const classes = useStyles();

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
        debugger
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
                    {({ isSubmitting, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase onChange={handleChange}
                                    type="text"
                                    name="search"
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }} />
                            </div>
                            <Button className={classes.button} variant="contained" type="submit" disabled={isSubmitting}>
                                Search
           </Button>
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