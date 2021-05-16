import { ResponseType } from 'axios';
import { UserType, ProfileType } from '../types/types';
import { instanse} from './api';

type GetUsersType={
    items: Array<UserType>
    totalCount: number
    error: string
}

export const usersApi = {
    getUsers(currentPage:number, pageSize:number, term:string, friend: null|boolean=null) {
        return instanse.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend===null ? '':`&friend=${friend}`))
            .then(response => {
                return response.data
            })
    },
    getFollowedUsers(currentPage:number, pageSize:number, friend:boolean) {
        return instanse.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&friend=${friend}`)
            .then(response => {
                return response.data
            })
    },
    postFollow(id:number) {
        return instanse.post<ResponseType>(`follow/${id}`, {})
        .then(res=>res.data)
    },

    deleteFollow(id:number) {
        return instanse.delete<ResponseType>(`follow/${id}`)
        .then(res=>res.data)
    },
    getProfile(userId:number |null) {
        return instanse.get<ProfileType>(`profile/` + userId)
        .then(res=>res.data)
    }
}