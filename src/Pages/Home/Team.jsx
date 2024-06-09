import React from 'react';
import Heading from '../../Components/Heading';
import Loading from '../../Components/Loading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Team = () => {
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
        <div className='mt-28 w-11/12 mx-auto max-w-[1200px]'>
            <Heading title={'Our Team'} details={''}/>
            <div className='grid grid-cols-3 gap-5'>
                    {data?.map((item,index)=>{
                      return <Trainer key={index} item={item}/>
                    })}
            </div>
        </div>
    );
};

export default Team;


const Trainer = ({item}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={item.photoURL} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{item.displayName}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
};
