import { instanse } from "./api"


type GetCaptchaType={
    url:string
}
export const captchaApi = {
    getCaptcha() {
        return instanse.get<GetCaptchaType>(`security/get-captcha-url`)
        .then(res=>res.data)
    }
}