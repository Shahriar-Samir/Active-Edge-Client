import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const TrainerBooking = () => {
    const {slotId} = useParams() 
    const axiosSecure = useAxiosSecure()

    const {data:slot,isFetching} = useQuery({
      queryKey:["slots"],
      queryFn: ()=>
          axiosSecure.get(`/trainerSlot/${slotId}`)
          .then(res=>{
              return res.data
          }),
      enabled: !!slotId
  })
  console.log(slot)

    if(isFetching){
      return <Loading/>
    }

    return (
        <div className='w-11/12 max-w-[1200px] mx-auto'>
             <Helmet>
                <title>Active Edge | Trainer Booking</title>
            </Helmet>
          <h1 className='mt-10 text-3xl font-semibold text-center'>Book Trainer</h1>
            <div className='mt-10'>
            <h1 className='text-2xl text-center font-bold'>{slot?.slotName}</h1>
            <h1 className='text-2xl text-center mt-2'>Trainer Name: {slot?.displayName}</h1>
            <div>
              <h1 className='text-xl font-bold text-center mt-5'>Classes</h1>
              <div className='flex gap-4 flex-wrap justify-center mt-4'>
            {slot?.selectedClasses.map((item,index)=>{
               return <button key={item} className='border rounded-lg p-2 cursor-auto font-bold'>{index+1}. {item}</button>
            })}
              </div>
            </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20'>
            <div className="bg-base-200 shadow-xl p-5 h-[500px] border-2 border-green-500 ">
    <div className="flex flex-col justify-between h-full">
      <div>
      <h2 className="text-4xl font-bold text-green-500 text-center">Basic</h2>
      <h2 className="text-5xl font-bold text-black text-center mt-10">20$</h2>
      </div>
      <ul className='list-disc px-5'>
        <li className=''>Access to gym facilities during regular operating hours.</li>
        <li className=''>Use of cardio and strength training equipment.</li>
        <li className=''>Access to online workout videos and fitness resources.</li>
      </ul>
      <div className="card-actions justify-center">
      <Link to={`/payment?slotId=${slotId}&type=basic`}><button className="btn bg-green-500 text-2xl font-bold text-white">Join Now</button></Link>
      </div>
    </div>
  </div>
            <div className="bg-base-200 shadow-xl border-2 border-yellow-500 p-5 h-[500px] ">
    <div className="flex flex-col justify-between h-full">
<div>
<h2 className="text-4xl font-bold text-yellow-500 text-center">Basic</h2>
<h2 className="text-5xl font-bold text-black text-center mt-10">50$</h2>
</div>
      <ul className='list-disc px-5'>
        <li className=''>Access to gym facilities during regular operating hours.</li>
        <li className=''>Use of cardio and strength training equipment.</li>
        <li className=''>Access to online workout videos and fitness resources.</li>
      </ul>
      <div className="card-actions justify-center">
      <Link to={`/payment?slotId=${slotId}&type=standard`}><button className="btn bg-yellow-500 text-2xl font-bold text-white">Join Now</button></Link>
      </div>
    </div>
  </div>
            <div className="bg-base-200 shadow-xl p-5 h-[500px] border-2 border-red-500">
    <div className="flex flex-col justify-between h-full">
      <div>
      <h2 className="text-4xl font-bold text-red-500 text-center">Premium</h2>
      <h2 className="text-5xl font-bold text-black text-center mt-10">100$</h2>
      </div>
      <ul className='list-disc px-5'>
        <li className=''>All benefits of the Standard Membership.</li>
        <li className=''>Access to personal training sessions with certified trainers.</li>
        <li className=''>Use of additional amenities like a sauna or steam room.</li>
        <li>Discounts on additional services such as massage therapy or nutrition counseling.</li>
        <li>Monthly fitness assessments and goal-setting sessions.</li>
      </ul>
      <div className="card-actions justify-center">
      <Link to={`/payment?slotId=${slotId}&type=premium`}><button className="btn bg-red-500 text-2xl font-bold text-white">Join Now</button></Link>
      </div>
    </div>
  </div>


            </div>
        </div>
    );
};

export default TrainerBooking;

