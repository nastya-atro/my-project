import React from 'react';
import ProfileInfo from './Profileinfo/Profileinfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from './../../components/common/preloader/Preloader'


const Profile = (props) => {

  if (!props.profile) {
    return <Preloader />
}
   

  return (

    <div>
      <ProfileInfo isOwner={props.isOwner}  putPhotos={props.putPhotos} 
      profile={props.profile} status={props.status} updateStatus={props.updateStatus} changeProfile={props.changeProfile}/>
      <MyPostsContainer  profile={props.profile}/>
    </div>
  )
}

export default Profile;