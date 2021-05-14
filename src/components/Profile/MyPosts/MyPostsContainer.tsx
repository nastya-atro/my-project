import { connect } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/redux-store';
import { PostsType, ProfileType } from '../../../types/types';
import MyPosts from './MyPosts';


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
    }
}
type MapStatePropsType = {
    posts: Array<PostsType>
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { addPost: actions.addPost })(MyPosts)
export default MyPostsContainer