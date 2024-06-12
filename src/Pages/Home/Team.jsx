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
            axiosPublic.get('/trainersTeam')
            .then(res=>{
                return res.data
            })
    })

    if(isFetching){
        return <Loading/>
    }
    return (
        <div className='mt-28 w-11/12 mx-auto max-w-[1200px]'>
            <Heading title={'Our Team'} details={'Meet Our Trainers'}/>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {data?.map((item,index)=>{
                      return <Trainer key={index} trainer={item}/>
                    })}
            </div>
            <div className='flex justify-center mt-7'>
              <Link to='/allTrainers'><button className='btn bg-bgCommon text-white font-bold hover:bg-bgHover text-xl'>Our Trainers</button></Link>
            </div>
        </div>
    );
};

export default Team;



const Trainer = ({trainer})=>{
  const {user} = useContext(AuthContext)
  const {photoURL,email,displayName,bio,fullName,uid,skills} = trainer

  return(
      <div className="card bg-base-100 shadow-xl p-5">
<figure><img src={photoURL}  className='w-full h-[250px] object-cover'/></figure>
<div className="p-4">
  <div className=''>
  <h2 className="text-2xl font-bold">{fullName} {user?.uid === uid? '(You)' : ''}</h2>
  <p>{bio}</p>
  </div>
    <div>
      <h1 className='font-bold text-lg mt-3'>Skills</h1>
    <div className='grid grid-cols-3 gap-3'>
      {skills.map(item=>{
        return <p key={item} className='md:p-3 md:border text-sm '>{item}</p>
      })}
    </div>
    </div>
</div>

</div>
  )
}
