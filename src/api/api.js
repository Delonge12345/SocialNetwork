import * as axios from "axios";


const baseUrl = 'https://social-network.samuraijs.com/api/1.0/';
const instance = axios.create({
    withCredentials: true,
    // baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'ccd2c24a-9b31-47bf-ba95-325f89b05cf7'}
})


export const getUsersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(baseUrl + `users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    unFollowUser(id) {
        return instance.delete(baseUrl + `follow/${id}`)

    },
    followUser(id) {
        return instance.post(baseUrl + `follow/${id}`)
    }

}

export const getProfileAPI = {
    getProfile(userId) {
        return instance.get(baseUrl + 'profile/' + userId)
            // .then(response => {
            //     return response.data;
            // })
    },

    getProfileStatus(userId){
        return instance.get(baseUrl + 'profile/status/' + userId)

    },
    updateProfileStatus(status){
        return instance.put(baseUrl + 'profile/status',{status:status})
    }
}

export const getAuthMeAPI = {
    authMe(){
        return instance.get(baseUrl + `auth/me`)
    },
    login(email,password,rememberMe=false,captcha=null){
        return instance.post(baseUrl + `auth/login`,{email, password, rememberMe, captcha});
    },
    logOut(){
        return instance.delete(baseUrl + `auth/login`)
    }


}



