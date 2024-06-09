import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';
import {Link} from 'react-router-dom'
import Loading from '../Components/Loading';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

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
        <div className='w-11/12 mx-auto max-w-[1200px]'>
            <h1 className='text-3xl text-center mt-10 font-bold'>All Trainers</h1>
            <div className='mt-10 grid grid-cols-4 gap-4 w-11/12 max-w-[1200px] mx-auto'>
            {data?.map(item=>{
                return <Trainer key={item._id} trainer={item}/>
            })}  
        </div>
        </div>
    );
};

export default AllTrainers;

const Trainer = ({trainer})=>{
    const {user} = useContext(AuthContext)
    const {photoURL,email,displayName,fullName,uid,xp,media} = trainer
    const axiosPublic = useAxiosPublic()
    const {data:slots} = useQuery({
        queryKey:["slots"],
        queryFn: ()=>
            axiosPublic.get(`/trainerSlots/${uid}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })
console.log(slots)
    return(
        <div className="card bg-base-100 shadow-xl">
  <figure><img src={photoURL}  className='w-full h-[200px] object-cover'/></figure>
  <div className="p-4">
    <div className=''>
    <h2 className="card-title">{fullName} {user?.uid === uid? '(You)' : ''}</h2>
    <p>Exp: {xp}years</p>
    </div>
    <div>
        <p>Available Slots: {slots?.length}</p>
    </div>
    <div className='flex justify-center items-center gap-4 mt-3'>
        {media?.map(item=>{
            if(item==='facebook'){
                return <FaFacebookSquare role='button' className='text-2xl' key={item}/>
            }
            if(item==='twitter'){
                return <FaSquareXTwitter role='button' className='text-2xl'  key={item}/>
            }
            if(item==='instagram'){
                return <FaInstagramSquare role='button' className='text-2xl'  key={item}/>
            }
            if(item==='linkedin'){
                return <FaLinkedin role='button' className='text-2xl'  key={item}/>
            }
            if(item==='whatsapp'){
                return <IoLogoWhatsapp role='button' className='text-2xl'  key={item}/>
            }
        })}
    </div>

    <div className="card-actions justify-end mt-4 w-full">
      <Link to={`/profile/${uid}`} className='w-full'><button className="btn w-full bg-bgCommon hover:bg-bgHover">Know more</button></Link>
    </div>
  </div>
</div>
    )
}