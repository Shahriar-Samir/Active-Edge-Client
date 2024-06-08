
import axios from 'axios'


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use(config=>{
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `bearer ${token}`
        return config
    }, (error=>{
        return Promise.reject(error)
    }))
    return axiosSecure
};

export default useAxiosSecure;