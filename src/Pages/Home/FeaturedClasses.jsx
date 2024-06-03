import React, { useEffect } from 'react';
import Heading from '../../Components/Heading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import {useQuery} from '@tanstack/react-query'

const FeaturedClasses = () => {
    const axiosSecure = useAxiosSecure()

    const {data} = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: ()=>
            axiosSecure.get('/featuredClasses')
            .then(res=>{
                return  res.data
            })
    })

    return (
        <div>
            <Heading title={'Featured Classes'} details={'Here are the top six classes'}/>
            <div className='grid grid-cols-3 gap-10'>
                    {
                        data?.map(item=>{
                            return <Card key={item._id} Class={item}/>
                        })
                    }
            </div>
        </div>
    );
};

export default FeaturedClasses;

const Card = ({Class})=>{
    const {image,className,details,bookings} = Class

    return <div className="card bg-base-100 shadow-xl">
    <figure><img src={image}  /></figure>
    <div className="card-body">
      <h2 className="card-title">
        {className}
        <div className="badge badge-secondary"></div>
      </h2>
      <p>I{details}</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Total Bookings: {bookings}</div> 

      </div>
    </div>
  </div>
}