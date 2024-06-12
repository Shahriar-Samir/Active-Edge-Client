
import axios from 'axios'


const axiosPublic = axios.create({
    baseURL: 'https://active-edge-backend.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;