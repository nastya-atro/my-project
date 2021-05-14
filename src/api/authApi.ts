import { instanse, ResponseType, ResultCodeEnum, ResultCodeEnumWithCaptcha } from './api';

type GetLoginTypeData = {
    id: number, email: string, login: string
}
type LoginTypeData = {
    userId: number
}
export const authApi = {
    getLogin() {
        return instanse.get<ResponseType<GetLoginTypeData, ResultCodeEnum | ResultCodeEnumWithCaptcha>>(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instanse.post<ResponseType<LoginTypeData, ResultCodeEnum | ResultCodeEnumWithCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instanse.delete<ResponseType>(`auth/login`)
            .then(res => res.data)
    }
}