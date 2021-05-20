import FriendPage from './FriendPage';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Preloader from '../common/preloader/Preloader';

 

const FriendPageContainer=()=>{
    const isFetching=useSelector((state:AppStateType)=>state.friendPage.isFetching)

    
    return(
        <>
        {isFetching ?<Preloader/>:null}
        <FriendPage />
        </>
    )
} 


export default FriendPageContainer