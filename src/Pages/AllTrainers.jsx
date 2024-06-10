
import { useQuery } from '@tanstack/react-query';
import Loading from '../Components/Loading';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Trainer from './TrainerCard';


const AllTrainers = () => {
    const axiosPublic = useAxiosPublic()
    const {data,isFetching} = useQuery({
        queryKey:["alltrainers"],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get('/allTrainers')
            .then(res=>{
                return res.data
            })
    })

    if(isFetching){
        return <Loading/>
    }
    return (
        <div className='w-11/12 mx-auto max-w-[1200px]'>
            <h1 className='text-3xl text-center mt-10 font-bold'>All Trainers</h1>
            <div className='mt-10 grid grid-cols-4 gap-4 w-11/12 max-w-[1200px] mx-auto'>
            {data?.map(item=>{
                return <Trainer key={item._id} trainer={item}/>
            })}  
        </div>
        </div>
    );
};

export default AllTrainers;

