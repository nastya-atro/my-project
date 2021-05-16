import React from 'react';
import { useSelector } from 'react-redux';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { selectorIsfetcing } from '../../redux/usersSelector';

const UsersPage=()=>{
    const isfetcing=useSelector(selectorIsfetcing)
    return(
        <> 
            {isfetcing ? <Preloader /> : null}
            <Users/>
        </>
    )
}



export default UsersPage