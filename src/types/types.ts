export type PostsType = {
    id: number
    message: string
    likesNumber: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription?: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe?:string

}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean

}

export type DialogsType={
    name: string
    id: number,
    photo: any
}
export type MessagesType={
    id: number
    message: string
    name: string
    time: string
    photo: string
}