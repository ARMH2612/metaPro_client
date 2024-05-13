import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3000/'
    baseURL: 'https://metapro-server-api.onrender.com/'
})

api.interceptors.request.use((config) => {
    const user = localStorage.getItem('user')
    if (user) {
        const parsedUser = JSON.parse(user)
        config.headers.Authorization = `Bearer ${parsedUser.token}`
    }
    return config
})

export default api