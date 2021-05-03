import React from 'react';
import s from './UsersT.module.css'
import UserImg from './../../../assets/images/user.img'
import { NavLink } from 'react-router-dom';
import { trenirovkaApi } from '../../../api/api';

const UsersContent = (props) => {
    let pageNumber = Math.ceil(props.totalCountUser / props.pageSize)
    let page = [];
    for (let i = 1; i <= pageNumber; i++) {
        page.push(i)
    }

    return (

        <div>
            <div>
                <div>{page.map((p) =>
                    <span className={props.selectedPage === p && s.activePage} onClick={() => { props.setSelectedPage(p) }}>
                        {p}

                    </span>)}</div>


                <div>
                    {props.users.map((u) => (
                        <div key={u.id} className={s.users}>
                            <div className={s.avatar}>
                                <NavLink to={'/profiletrenirovka/'+u.id}>
                                    <img src={u.photos.small !== null ? u.photos.small : UserImg}></img>
                                </NavLink>
                            </div>

                            <div>
                                {u.followed ?
                                    <button disabled={props.followingProgress.some(id=>id===u.id)} onClick={() => { 

                                        props.unfollowThunk(u.id)

                                    }}>Unfollow</button> :
                                    <button disabled={props.followingProgress.some(id=>id===u.id)} onClick={() => {

                                        props.followThunk(u.id)
                                       
                                        
                                        }}>Follow</button>}
                            </div>

                            <div>{u.name}</div>
                            <div>{u.status}</div>

                        </div>))}





                </div>
            </div>






        </div >
    )
}

export default UsersContent