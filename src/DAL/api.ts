import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238",
    },
    withCredentials: true
})

export const UsersApi = {
    getUsers(usersCount: number, currentPage: number) {
        return instance.get(`/users?count=${usersCount}&page=${currentPage}`, {})
            .then(response => {
                return response.data
            })
    },
    followUser(userId: string) {
        return instance.post(`/follow/${userId}`, {}, {})
    },
    unFollowUser(userId: string) {
        return instance.delete(`/follow/${userId}`, {})
    }
}

export const ProfileApi = {
    getProfile(paramsId: string | undefined) {
        return instance.get(`/profile/${paramsId}`)
    },
    getStatus(paramsId: string | undefined) {
        return instance.get(`/profile/status/${paramsId}`)
            .then(response => {
                return response.data
            })
    },
    updateStatus(status: Object) {
        return instance.put(`/profile/status`, {status})
    }
}
export const CommonApi = {
    getDailyQuote(){
        return axios.get(`https://animechan.vercel.app/api/random`)
    }
}

export const AuthApi = {
    authMe() {
        return instance.get('/auth/me', {})
    },
    login(email:string, password: string, rememberMe = false) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
    },
    logOut(){
        return instance.delete(`/auth/login`)
    }
}


