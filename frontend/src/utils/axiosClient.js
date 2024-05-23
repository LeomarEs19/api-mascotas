import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3333'
})

axiosClient.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    request.headers['token'] = token
    return request
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status == 401) {
        localStorage.clear()

        
        location.href =  "/logout"
    }
})

export default axiosClient