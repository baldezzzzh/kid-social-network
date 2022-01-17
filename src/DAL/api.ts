import axios from "axios";


export type ArticleItemType = {
    source: {
        id: string
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

export type NewsResponseType = {
    status: string
    totalResults: number
    articles: Array<ArticleItemType>
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238",
    },
    withCredentials: true
})

const herokuInstance = axios.create({
    baseURL: 'https://spotify-for-social-network.herokuapp.com/'
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

export const NewsApi = {
    getNews(articlesCount: number, currentPage: number){
        return axios.get<NewsResponseType>(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&page=${currentPage}&apiKey=c0b099f14fff4628ae16e5c63887ae09`)
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


