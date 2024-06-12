
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';
import {Link} from 'react-router-dom'
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';


const Trainer = ({trainer})=>{
  const min4 = useMediaQuery('(min-width:400px)');
  const min6 = useMediaQuery('(min-width:600px)');
    const {user} = useContext(AuthContext)
    const [slots,setSlots] = useState([])
    const {photoURL,email,displayName,fullName,uid,xp,media} = trainer
    const axiosPublic = useAxiosPublic()
    useEffect(()=>{
        axiosPublic.get(`/availableSlots/${trainer?.uid}`)
                .then(res=>{
                    setSlots(res.data)
                })
    },[])

    return(
        <div className={`card bg-base-100 w-${min4 && min6? 'full' :  min4 && !min6? '2/3' : 'full' } mx-auto md:w-full shadow-xl`}>
  <figure><img src={photoURL}  className='w-full h-[200px] object-cover'/></figure>
  <div className="p-4">
    <div className=''>
    <h2 className="card-title">{fullName} {user?.uid === uid? '(You)' : ''}</h2>
    <p>Exp: {xp} years</p>
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

export default Trainer