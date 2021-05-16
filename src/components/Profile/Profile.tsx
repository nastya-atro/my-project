import React, { useEffect } from 'react';
import ProfileInfo from './Profileinfo/Profileinfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/preloader/Preloader'
import { ProfileType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { getStatus, putPhotos } from '../../redux/profileReducer';
import { updateStatus, changeProfile, getProfile } from './../../redux/profileReducer';
import { useHistory } from 'react-router';


let Profile:React.FC= () => {
  debugger
  const profile = useSelector((state: AppStateType) => state.profilePage.profile)
  const authUserId = useSelector((state: AppStateType) => state.auth.id)
  const status = useSelector((state: AppStateType) => state.profilePage.status)
  
  const dispatch = useDispatch()
  const putPhotosCallback = (photos: any) => {
    dispatch(putPhotos(photos))
  }
  const updateStatusCallback = (status: string) => {
    dispatch(updateStatus(status))
  }
  const changeProfileCallback = (profile: ProfileType) => {
    dispatch(changeProfile(profile))
  }
  const getProfileCallback = (userId: number | null) => {
    dispatch(getProfile(userId))
  }

  const getStatusCallback = (userId: number) => {
    dispatch(getStatus(userId))
  }

  const history = useHistory()
  let adress = history.location.pathname
  let id = Number(adress.substring(9))
  let userId: number | null = +id

  let updateProfile = () => {
    if (userId===0) {
      userId = authUserId
      if (userId===0) {
        history.push("/login")
      }}
      getProfileCallback(userId)
      getStatusCallback(userId as number)
  }

    useEffect(() => {
      updateProfile()
    }, [userId])

    


    if (!profile) {
      return <Preloader />
    }

    return (
      <div>
        <ProfileInfo isOwner={!id} putPhotos={putPhotosCallback}
          profile={profile} status={status} updateStatus={updateStatusCallback} changeProfile={changeProfileCallback} />
        <MyPostsContainer />
      </div>
    )
  }

  export default Profile