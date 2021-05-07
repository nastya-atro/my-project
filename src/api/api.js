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
    login(email, password, rememberMe, captcha=null){
        return instanse.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout(){
        return instanse.delete(`auth/login`)
    }

}

export const captchaApi={
    getCaptcha(){
        return instanse.get(`security/get-captcha-url`)
    }
}



export const profileApi={
    getStatus(userId){
        return instanse.get(`profile/status/`+userId)
    },
    updateStatus(status){
        return instanse.put(`profile/status`, {status: status})
    },
    putPhotos(photos){
        const formData= new FormData();
        formData.append("image", photos)
        return instanse.put(`profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    changeProfile(profile){
        return instanse.put(`profile`, profile)
    }
}

