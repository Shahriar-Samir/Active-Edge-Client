import React from 'react';
import { Helmet } from 'react-helmet-async';
import Heading from '../../../Components/Heading';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';


    const RecommendedClasses = () => {
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
            <div className='w-11/12 mx-auto max-w-[1200px] mt-5'>
                <Heading title={'Recommended Classes'} details={'Here are some recommended classes selected by admin'}/>
                <div className='grid grid-cols-1  gap-5 mt-10'>
                        {
                            data?.map((item,index)=>{
                                return <Card key={item._id} Class={item} index={index}/>
                            })
                        }
                </div>
            </div>
        );
    };
    
    export default RecommendedClasses;
    
    const Card = ({Class,index})=>{
        const {image,className,details,bookings} = Class
    
        return <div className="flex bg-base-100 shadow-xl flex-col md:flex-row p-4">
        <figure><img src={image}  className='max-w-[300px] mx-auto md:w-[100px] md:h-[100px] object-cover ' /></figure>
        <div className="w-full p-2">
          <div className='flex flex-col md:flex-row justify-between w-full'>
          <h2 className="card-title font-bold">
            {className}
          </h2>
            <div className="font-semibold rounded-2xl">Total Bookings: {bookings}</div>
          </div>
          <p>{details}</p>
          </div>
     
        
      </div>
    }