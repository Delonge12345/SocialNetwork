import axios from "axios";
import {ProfileType} from "../types/types";


const baseUrl = 'https://social-network.samuraijs.com/api/1.0/';
const instance = axios.create({
    withCredentials: true,
    // baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'ccd2c24a-9b31-47bf-ba95-325f89b05cf7'}
})


export const getUsersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(baseUrl + `users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    unFollowUser(id: number) {
        return instance.delete(baseUrl + `follow/${id}`)

    },
    followUser(id: number) {
        return instance.post(baseUrl + `follow/${id}`)
    }

}

export const getProfileAPI = {
    getProfile(userId: number) {
        return instance.get(baseUrl + 'profile/' + userId)
        // .then(response => {
        //     return response.data;
        // })
    },

    getProfileStatus(userId: number) {
        return instance.get(baseUrl + 'profile/status/' + userId)

    },
    updateProfileStatus(status: string) {
        return instance.put(baseUrl + 'profile/status', {status: status})
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put(baseUrl + 'profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfileData(profile: ProfileType) {
        return instance.put(baseUrl + 'profile', profile)
    }
}

type AuthMeResponseType = {
    data: { id: number, email: string, login: string },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}


export enum ResultCodesEnumWithCaptcha {
    CaptchaIsRequired = 10
}

type LoginResponseType = {
    data: { userId:number },
    resultCode: ResultCodesEnum | ResultCodesEnumWithCaptcha,
    messages: Array<string>
}

export const getAuthMeAPI = {
    authMe() {
        return instance.get<AuthMeResponseType>(baseUrl + `auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(baseUrl + `auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
    },
    logOut() {
        return instance.delete(baseUrl + `auth/login`)
    }


}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(baseUrl + `security/get-captcha-url`);
    }
}

getAuthMeAPI.authMe().





