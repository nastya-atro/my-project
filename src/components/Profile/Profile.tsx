import React from 'react';
import ProfileInfo from './Profileinfo/Profileinfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/preloader/Preloader'
import { PhotosType, ProfileType } from '../../types/types';

type PropsTypes={
  isOwner:boolean
  putPhotos:(photos: File)=>void
  profile: ProfileType |null
  status: string
  updateStatus: (status: string)=>void
  changeProfile:(profile: ProfileType)=>void
}

const Profile:React.FC<PropsTypes> = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} putPhotos={props.putPhotos}
        profile={props.profile} status={props.status} updateStatus={props.updateStatus} changeProfile={props.changeProfile} />
      <MyPostsContainer/>
    </div>
  )
}

export default Profile;