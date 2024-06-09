import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic()

    const {data,isFetching} = useQuery({
        queryKey: ['featuredClasses'],
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
            <div className='grid grid-cols-2 gap-10'>
                {data?.map(item=>{
                    return <Class key={item._id} ClassItem={item}/>
                })}
            </div>
        </div>
    );
};

export default AllClasses;

const Class = ({ClassItem})=>{
    const {className,details,bookings,image} = ClassItem
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={image}/></figure>
  <div className="card-body">
    <h2 className="card-title">{className}</h2>
    <p>{details}</p>
    <p>{bookings}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Details</button>
    </div>
  </div>
</div>
    )
}