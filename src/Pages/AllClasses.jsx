import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic()

    const {data,isFetching} = useQuery({
        queryKey: ['allClasses'],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get('/allClasses')
            .then(res=>{
                return  res.data
            })
        
    })
    if(isFetching){
        return <Loading></Loading>
    }
    return (
        <div className='mx-auto w-11/12 max-w-[1200px]'>
            <h1 className='mt-10 text-center text-3xl font-bold'>Available Classes</h1>
            <div className='grid grid-cols-2 gap-10 mt-10'>
                {data?.map(item=>{
                    return <Class key={item._id} ClassItem={item}/>
                })}
            </div>
        </div>
    );
};

export default AllClasses;

const Class = ({ClassItem})=>{
    const {className,details,bookings,image,trainers} = ClassItem
    return (
        <div className="flex bg-base-100 shadow-xl rounded-xl">
  <figure className='w-1/3'><img src={image} className='w-full h-full object-cover rounded-s-xl'/></figure>
  <div className="w-2/3 p-5 flex flex-col justify-between">
    <div>
    <h2 className="text-2xl font-bold">{className}</h2>
    <p>{details}</p>  
    </div>
    <div className="card-actions justify-between items-center mt-4">
    <p className='text-lg'><span className='font-bold'>Booking:</span> {bookings}</p>
    {trainers.length > 5? <div className='flex gap-2 items-center'>
        {trainers?.slice(0,5).map(item=>{
            return <Link key={item} to={`/profile/${item.trainerUid}`}><img src={item.trainerPhotoURL} className='w-[30px] h-[30px] rounded-full object-cover'/></Link>
        })}
                <Link to='/allTrainers'><p className='text-sm font-bold'>more+</p></Link>
    </div>
    :
    <div className='flex gap-2 items-center'>
    {trainers?.map(item=>{
        return <Link key={item} to={`/profile/${item.trainerUid}`}><img src={item.trainerPhotoURL} className='w-[30px] h-[30px] rounded-full object-cover'/></Link>
    })}
</div>}
    </div>
  </div>
</div>
    )
}