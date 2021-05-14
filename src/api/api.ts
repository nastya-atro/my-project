import axios from 'axios';

export const instanse = axios.create({
    withCredentials: true,
    headers: { "API-KEY": "e33a9b28-32d1-4022-81b8-0bd4ba992caa" },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export enum ResultCodeEnum {
    Success =0,
    Error = 1
}
export enum ResultCodeEnumWithCaptcha{
    CaptchaIsRequired=10
}
export type ResponseType<D={}, RC=ResultCodeEnum>={
    resultCode: RC
    messages: Array<string>
    data: D
}




