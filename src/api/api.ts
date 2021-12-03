import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238",
    },
    withCredentials: true
})

export const UsersApi = {
    getUsers (usersCount: number, currentPage: number) {
        return instance.get(`/users?count=${usersCount}&page=${currentPage}`, {})
            .then(response => {
                return response.data
            })
    },
    followUser (userId: string) {
        return instance.post(`/follow/${userId}`, {}, {})
    },
    unFollowUser (userId: string) {
        return instance.delete(`/follow/${userId}`, {})
    }
}

export const ProfileApi = {
    getProfile (paramsId: string | undefined) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${paramsId}`)
    }
}

export const AuthApi ={
    authMe () {
        return instance.get('/auth/me', {})
    }
}