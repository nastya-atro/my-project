import axios from 'axios';

const instanse= axios.create({
    withCredentials: true,
    headers: { "API-KEY": "e33a9b28-32d1-4022-81b8-0bd4ba992caa" },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export const usersApi ={
    getUsers(currentPage, pageSize){
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response=>{
                return response.data})
    }, 
    postFollow(id){
        return instanse.post(`follow/${id}`, {})                                   
    },
    
    deleteFollow(id){
        return instanse.delete(`follow/${id}`)
    },
    getProfile(userId){
        return instanse.get(`profile/`+userId)
    }

}

export const authApi={
    getLogin(){
        return instanse.get(`auth/me`)
    },
    login(email, password, rememberMe){
        return instanse.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instanse.delete(`auth/login`)
    }

}

export const profileApi={
    getStatus(userId){
        return instanse.get(`profile/status/`+userId)
    },
    updateStatus(status){
        return instanse.put(`profile/status`, {status: status})
    }
}

export const trenirovkaApi={
    getUsersTr(pageSize, selectedPage){
        return instanse.get(`users?count=${pageSize}&page=${selectedPage}`)
    },
    follow(id){
        return instanse.post(`follow/${id}`, {})
    },
    unfollow(id){
        return instanse.delete(`follow/${id}`, {})
    },
    getProfilePage(userId){
        return instanse.get (`profile/` + userId)
    },
    getAuth(){
        return instanse.get(`auth/me`)
    },
    getStatus(userId){
        return instanse.get(`profile/status/`+ userId)
    },
    updateStatus(status){
        return instanse.put(`profile/status`, {status: status})
    },
    login(email, password, rememberMe=false){
        return instanse.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instanse.delete(`auth/login`)
    }
}