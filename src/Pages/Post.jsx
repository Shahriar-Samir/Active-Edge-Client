import React, { useContext, useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { formatDistanceToNow } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../Components/Loading';
import { useQuery } from '@tanstack/react-query';

const Post = () => {
    const {id} = useParams()
    const [timeAgo,setTimeAgo] = useState('Loading...')
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [upVotes,setUpVotes] = useState()
    const [downVotes,setDownVotes] = useState()



    const {data:post, isFetching} = useQuery({
        queryKey:[],
        queryFn: ()=>
            axiosPublic.get(`/forumPost/${id}`)
            .then(res=>{
                return res.data
            }),
    })

    const [vote,setVote] = useState()

    const {data:voteStatus, isFetching:statusFetching} = useQuery({
        queryKey:[vote,user],
        queryFn: ()=>
            axiosSecure.get(`/myVoteStatus`,{params:{uid:user?.uid,postId:id}})
            .then(res=>{
                return res.data
            }),
    })

   

    
    useEffect(()=>{
        axiosPublic.get(`/getUpVotes/${id}`)
        .then(res=>{
                setUpVotes(res.data)
        })
        axiosPublic.get(`/getDownVotes/${id}`)
        .then(res=>{
                setDownVotes(res.data)
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
    },[vote])





    const upVote = ()=>{
        const postId = id
        if(voteStatus === 'noVote' || voteStatus === 'downVote'){
                 axiosSecure.delete('/removeDownVote', {params:{uid:user?.uid,postId}})
            axiosSecure.post('/addUpVote', {uid:user?.uid,displayName:user?.displayName,email:user?.email,postId,type:'upVote'})
        .then(()=>{
                setVote('upVote')
        })
        }
        if(voteStatus === 'upVote'){
            axiosSecure.delete('/removeUpVote', {params:{uid:user?.uid,postId}})
        .then(()=>{
                setVote('noVote')
        })
        }
    }



    const downVote = ()=>{
        const postId = id
        if(voteStatus === 'noVote' || voteStatus === 'upVote'){
            axiosSecure.delete('/removeUpVote', {params:{uid:user?.uid,postId}})
            axiosSecure.post('/addDownVote', {uid:user?.uid,displayName:user?.displayName,email:user?.email,postId,type:'downVote'})
        .then(()=>{
                setVote('downVote')
        })
        }
        if(voteStatus === 'downVote'){
            axiosSecure.delete('/removeDownVote', {params:{uid:user?.uid,postId}})
        .then(()=>{
                setVote('noVote')
        })
        }
    }




    useEffect(()=>{
        if(post?.date){
            setInterval(()=>{
                setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }))
        },1000)
        }
        
    },[post?.date])

    if(isFetching){
            return    <Loading/>
}
const {texts,title,date,displayName,photoURL,role} = post


    return(
        <div className='flex justify-center min-h-[80vh]'>
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md mt-10 w-11/12 max-w-[600px] h-fit">
             <ToastContainer/>
         <div className="flex justify-between items-center mb-5 text-gray-500">
         <div className="flex justify-between items-center">
             <div className="flex items-center space-x-4">
                 <img className="w-12 h-12 rounded-full object-cover" src={photoURL} alt={displayName} />
                 <div className='flex flex-col'>
                 <span className="font-bold text-xl text-black">
                     {displayName}
                 </span>
                 <span className={`${role==='admin'?'text-orange-500':'text-blue-500'} font-bold`}>{role === 'admin'? 'Admin' : 'Trainer'}</span>
                 </div>
             </div>
         </div>
             <span className="text-sm">{timeAgo}</span>
         </div>
         <h2 className="mb-2 text-lg font-bold "><p>{title}</p></h2>
         <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{texts}</p>
         <div className='flex justify-between '>
             <div className='flex gap-5 items-center'>
             <div className={`${voteStatus === 'upVote'? 'bg-blue-500 hover:bg-blue-300' : 'bg-bgCommon hover:bg-bgHover'} p-2 flex items-center gap-2 rounded-md cursor-pointer text-white font-bold `} onClick={()=> user? upVote() : navigate('/login')}>
             <FaArrowUp className='text-xl ' />
                 <p>{upVotes?.allUpVotes}</p>
             </div>
             <div className={`${voteStatus === 'downVote'? 'bg-red-500 hover:bg-red-300' : 'bg-bgCommon hover:bg-bgHover'} p-2 flex items-center gap-2 rounded-md cursor-pointer text-white font-bold`}  onClick={()=> user? downVote() : navigate('/login')}>
             <FaArrowDown className='text-xl' />
             <p>{downVotes?.allDownVotes}</p>
             </div>
             </div>
         </div>
     </article>
        </div>
     )
    
};

export default Post;