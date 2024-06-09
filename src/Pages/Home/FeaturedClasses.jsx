import React, { useEffect } from 'react';
import Heading from '../../Components/Heading';
import {useQuery} from '@tanstack/react-query'
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const FeaturedClasses = () => {
    const axiosPublic = useAxiosPublic()

    const {data} = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: ()=>
            axiosPublic.get('/featuredClasses')
            .then(res=>{
                return  res.data
            })
    })

    return (
        <div className='w-11/12 mx-auto max-w-[1200px] mt-28'>
            <Heading title={'Featured Classes'} details={'Here are the top six classes'}/>
            <div className='grid grid-cols-3 gap-10 mt-10'>
                    {
                        data?.map((item,index)=>{
                            return <Card key={item._id} Class={item} index={index}/>
                        })
                    }
            </div>
        </div>
    );
};

export default FeaturedClasses;

const Card = ({Class,index})=>{
    const {image,className,details,bookings} = Class

    return <div className="card rounded-none bg-base-100 shadow-xl">
    <figure><img src={image}  className='w-full object-cover h-[250px]' /></figure>
    <div className="card-body">
      <h2 className="card-title font-bold">
        {className}
        <div className="badge bg-[gold] text-white text-lg p-3">{index+1}{index===0? 'st' : index===1? 'nd' : index===2?'rd' : 'th'}</div>
      </h2>
      <p>{details}</p>
      <div className="card-actions justify-start">
        <div className="px-2 py-1 font-semibold border border-black rounded-2xl">Total Bookings: {bookings}</div> 
      </div>
    </div>
  </div>
}