
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL: 'https://active-edge-backend.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {signout} = useAuth()

    axiosSecure.interceptors.request.use(config=>{
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `bearer ${token}`
        return config
    }, error=>{
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(response=>{
        return response
    }, async error=>{
        const status = error.response.status
        if(status === 401 || status === 403){
            await signout()
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;