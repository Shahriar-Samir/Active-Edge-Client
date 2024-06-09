import React, { useContext } from 'react';
import Heading from '../../Components/Heading';
import Loading from '../../Components/Loading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

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
                      return <Trainer key={index} trainer={item}/>
                    })}
            </div>
        </div>
    );
};

export default Team;



const Trainer = ({trainer})=>{
  const {user} = useContext(AuthContext)
  const {photoURL,email,displayName,fullName,uid,skills} = trainer

  return(
      <div className="card bg-base-100 shadow-xl p-5">
<figure><img src={photoURL}  className='w-full h-[250px] object-cover'/></figure>
<div className="p-4">
  <div className=''>
  <h2 className="card-title">{fullName} {user?.uid === uid? '(You)' : ''}</h2>
  </div>
    <div className='grid grid-cols-3'>
      {skills.map(item=>{
        return <p key={item}>{item}</p>
      })}
    </div>
  <div className="card-actions justify-end mt-4 w-full">
    <Link to={`/profile/${uid}`} className='w-full'><button className="btn w-full bg-bgCommon hover:bg-bgHover">Know more</button></Link>
  </div>
</div>
</div>
  )
}
