import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';
import { Helmet } from 'react-helmet-async';

const TrainerDetails = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const {data:trainerData,isFetching} = useQuery({
        queryKey:["trainerData"],
        queryFn: ()=>
            axiosPublic.get(`/trainerData/${id}`)
            .then(res=>{
                return res.data
            })
    })

    const {data:slots} = useQuery({
      queryKey:["slots"],
      queryFn: ()=>
          axiosPublic.get(`/trainerSlots/${id}`)
          .then(res=>{
              return res.data
          }),
      enabled: !!user
  })

  if(isFetching){
    return <Loading/>
  }


    return (
        <div className="w-11/12 mx-auto mt-20 max-w-[1200px]">
             <Helmet>
                <title>Active Edge | Trainer Details</title>
            </Helmet>
            <div className='mt-10'>
  <div className="flex flex-col md:flex-row justify-between gap-10">
    <img src={trainerData?.photoURL} className="w-1/2 md:w-2/5 mx-auto md:mx-0 object-cover md:h-[500px]" />
    <div className='3/5 flex flex-col gap-3'>
      <h1 className="text-4xl text-center md:text-start md:text-5xl font-bold ">{trainerData.fullName}</h1>
      <p className="text-xl mt-4 md:mt-0"><span className='font-bold'>Biography:</span> {trainerData?.bio}</p>
      <p className="text-xl"><span className='font-bold'>Age:</span> {trainerData?.age} years</p>
      <p className="text-xl"><span className='font-bold'>Experience:</span> {trainerData?.xp} years</p>
      <p className="text-xl"><span className='font-bold'>Time:</span> {trainerData.time}</p>
      <div className='flex gap-2 flex-col'>
      <p className='text-xl font-bold'>Skills:</p>
      <div className='grid grid-cols-3 md:grid-cols-5 gap-4 text-sm '>
        {trainerData?.skills.map(item=>{
          return <button key={item} className='bg-[#f4d941] rounded-lg py-2 cursor-auto font-bold'>{item}</button>
        })}
    </div>
      <p className='text-xl font-bold mt-2'>Available Days:</p>
      <div className='grid grid-cols-3 md:grid-cols-7 gap-4 text-sm '>
        {trainerData?.days.map(item=>{
          return <button key={item} className='bg-green-700 text-white rounded-lg py-2 cursor-auto font-bold'>{item}</button>
        })}
    </div>
      </div>
    </div>
  </div>
 
</div>
<div className='flex justify-start item-center mt-5'>

{user?.role === 'member'? <Link to='/trainerApplication'><button className='btn bg-bgCommon hover:bg-bgHover text-white font-bold text-xl'>Become a trainer</button></Link>
:
''
}
</div>
  <div className='mt-4'>
    <h1 className='text-center text-3xl font-bold'>Available slots</h1>

{     slots?.length > 0?  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-5'>
     {
    slots?.map(item=>{
          return <Link to={`/trainerBooking/${item._id}`} key={item._id} className="card bg-bgCommon hover:bg-bgHover">
          <div className="card-body">
            <h2 className="text-2xl font-bold">{item.slotName}</h2>
            <p className='font-semibold'>Time: {item.slotTime} hours</p>
            <p className='font-semibold'>Classes: {item.selectedClasses.length}</p>
          </div>
        </Link>
        })
    }
   </div> : <div className='mt-5'>
      <p className='text-xl font-semibold text-center'>There are no slots available</p>
    </div>}

   
  </div>
        </div>
    );
};

export default TrainerDetails;