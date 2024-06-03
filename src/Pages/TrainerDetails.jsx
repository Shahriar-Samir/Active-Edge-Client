import React, { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const TrainerDetails = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data} = useQuery({
        queryKey:["posts"],
        queryFn: ()=>
            axiosSecure.get(`/trainerData/${id}`)
            .then(res=>{
                return res.data
            })
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
        </div>
    );
};

export default TrainerDetails;