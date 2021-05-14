import { PhotosType, ProfileType } from "../types/types"
import { instanse, ResponseType} from "./api"

type PutPhotosTypeData={
    photos: PhotosType
}

export const profileApi = {
    getStatus(userId:number) {
        return instanse.get(`profile/status/` + userId)
        .then(res=>res.data)
    },
    updateStatus(status:string) {
        return instanse.put<ResponseType>(`profile/status`, { status: status })
        .then(res=>res.data)
    },
    putPhotos(photos: any) {
        const formData = new FormData();
        formData.append("image", photos)
        return instanse.put<ResponseType<PutPhotosTypeData>>(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res=>res.data)
    },
    changeProfile(profile: ProfileType) {
        return instanse.put<ResponseType>(`profile`, profile)
        .then(res=>res.data)
    }
}

