import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const TrainerDetails = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const {data} = useQuery({
        queryKey:["posts"],
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



    return (
        <div>
            <div className="hero">
  <div className="hero-content flex-col lg:flex-row">
    <img src={data?.photoURL} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
  </div>
 
</div>
<div>
{user?.role === 'member'? <Link to='/trainerApplication'><button className='btn'>Be a trainer</button></Link>
:
''
}
  </div>
  <div>
    <h1 className='text-center'>Available slots</h1>
    {
        slots?.map(item=>{
          return <Link to={`/trainerBooking/${item._id}`} key={item._id} className="card w-96 bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">{item.slotName}</h2>
            <p>{item.slotTime}</p>
          </div>
        </Link>
        })
    }
  </div>
        </div>
    );
};

export default TrainerDetails;