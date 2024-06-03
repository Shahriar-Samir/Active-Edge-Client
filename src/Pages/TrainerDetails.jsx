import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const TrainerDetails = () => {
    const {id} = useParams()
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
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default TrainerDetails;