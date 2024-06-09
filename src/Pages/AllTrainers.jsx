import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';
import {Link} from 'react-router-dom'
import Loading from '../Components/Loading';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const AllTrainers = () => {
    const axiosPublic = useAxiosPublic()
    const {data,isFetching} = useQuery({
        queryKey:["alltrainers"],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get('/allTrainers')
            .then(res=>{
                return res.data
            })
    })

    if(isFetching){
        return <Loading/>
    }
    return (
        <div className='grid grid-cols-4 gap-4 w-11/12 max-w-[1200px] mx-auto'>
            {data?.map(item=>{
                return <Trainer key={item._id} trainer={item}/>
            })}  
        </div>
    );
};

export default AllTrainers;

const Trainer = ({trainer})=>{
    const {user} = useContext(AuthContext)
    const {photoURL,email,displayName,uid} = trainer
    return(
        <div className="card bg-base-100 shadow-xl">
  <figure><img src={photoURL}  /></figure>
  <div className="card-body">
    <h2 className="card-title">{displayName} {user?.uid === uid? '(You)' : ''}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <Link to={`/profile/${uid}`}><button className="btn btn-primary">Know more</button></Link>
    </div>
  </div>
</div>
    )
}