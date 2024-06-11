import React, { useContext, useEffect, useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAxiosSecure from '../Hooks/useAxiosSecure'
import Loading from '../Components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { AuthContext } from '../Providers/AuthProvider';
import {toast,ToastContainer} from 'react-toastify'



const Forum = () => {
    const axiosPublic = useAxiosPublic()
    const postsPerPage = 6
    const [currentPage,setCurrentPage] = useState(0)
    const [currentButtons,setCurrentButtons]= useState(0)

    const {data:posts,isFetching} = useQuery({
        queryKey:[currentPage],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get(`/forumPosts?page=${currentPage}&size=${postsPerPage}`)
            .then(res=>{
                return res.data
            }),
    })
    const {data:postsCount,isFetching:fetching2} = useQuery({
        queryKey:["postsCount"],
        initialData: {},
        queryFn: ()=>
            axiosPublic.get('/forumPostsCount')
            .then(res=>{
                return res.data
            })
    })



  

    if(isFetching || fetching2 ){
        return <Loading/>
    }

        const numberOfPages = Math.ceil(postsCount?.postsLength / postsPerPage)
        const pages = [...Array(numberOfPages).keys()]
    
        const changePage = (pageNumber)=>{
                setCurrentPage(pageNumber)
                setCurrentButtons(Math.floor(pageNumber/10))
        }
       
        const nextPage = ()=>{
            if(currentPage<(numberOfPages-1)){
                setCurrentPage(currentPage+1)
                setCurrentButtons(Math.floor((currentPage+1)/10))
            }
        }
        const prePage = ()=>{
            if(currentPage>0){
                setCurrentPage(currentPage-1)
                setCurrentButtons(Math.floor((currentPage-1)/10))
            }
        }
    console.log(currentButtons)
        return (
            <div className='w-11/12 mx-auto max-w-[1200px]'>
                           <ToastContainer/>
                <p className='mt-5 text-3xl font-bold text-center'>Forum Posts</p>
    {posts.length < 1? <div className='h-[80vh] flex justify-center items-center'>
        <h1 className='text-center font-bold text-xl'>There are no post available</h1>
    </div>:
            <div>
                <div className='flex flex-col max-w-[700px] gap-5 mx-auto mt-10'>
            {posts?.map(item=>{
                return <Post key={item?._id} post={item}/>
            })}
            </div>
            <div className='w-full flex justify-center items-center mt-16'><div className="join ">
      <input onClick={prePage} className="join-item btn btn-square" type="radio" checked={false} name="options" aria-label="Prev" disabled={currentPage ===0? true : false} />
      {
        currentPage>9? <input checked={false} className="join-item btn btn-square" type="radio" name="options" aria-label="..." /> : ''
     }
        {
            pages.slice(10*currentButtons,10*(currentButtons+1)).map(page=>{
                return   <input onClick={()=>{ changePage(page)}} key={page} className="join-item btn btn-square" type="radio" name="options" checked={currentPage===page? true : false} aria-label={page+1} />
            })
        }
     {
     
        currentPage<((Math.ceil(numberOfPages/10)*10)-10)? <input checked={false} className="join-item btn btn-square" type="radio" name="options" aria-label="..." /> : ''
     }
      <input onClick={nextPage} checked={false} className="join-item btn btn-square" type="radio" name="options" aria-label="Next" disabled={currentPage ===(numberOfPages-1) ? true : false} />
    </div></div>
    
            </div>}
            </div>
        );
    }

export default Forum;

const Post = ({post})=>{
    const {texts,title,date,displayName,photoURL,role,_id,uid,email} = post
    const [timeAgo,setTimeAgo] = useState('Loading...')
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [vote,setVote] = useState()
    const [upVotes,setUpVotes] = useState()
    const [downVotes,setDownVotes] = useState()


    useEffect(()=>{
        axiosSecure.get(`/myVoteStatus`,{params:{uid:user?.uid,postId:_id}})
        .then(res=>{
                setVote(res.data)
        })
    },[])
    
    useEffect(()=>{
        axiosPublic.get(`/getUpVotes/${_id}`)
        .then(res=>{
                setUpVotes(res.data)
        })
        axiosPublic.get(`/getDownVotes/${_id}`)
        .then(res=>{
                setDownVotes(res.data)
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
    },[vote])


    useEffect(()=>{
        if(date){
            setInterval(()=>{
                setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }))
        },1000)
        }
    },[date])


    const upVote = ()=>{
        const postId = _id
        if(vote === 'noVote' || vote === 'downVote'){
                 axiosSecure.delete('/removeDownVote', {params:{uid:user?.uid,postId}})
            axiosSecure.post('/addUpVote', {uid:user?.uid,displayName:user?.displayName,email:user?.email,postId,type:'upVote'})
        .then(()=>{
                setVote('upVote')
        })
        }
        if(vote === 'upVote'){
            axiosSecure.delete('/removeUpVote', {params:{uid:user?.uid,postId}})
        .then(()=>{
                setVote('noVote')
        })
        }
    }



    const downVote = ()=>{
        const postId = _id
        if(vote === 'noVote' || vote === 'upVote'){
            axiosSecure.delete('/removeUpVote', {params:{uid:user?.uid,postId}})
            axiosSecure.post('/addDownVote', {uid:user?.uid,displayName:user?.displayName,email:user?.email,postId,type:'downVote'})
        .then(()=>{
                setVote('downVote')
        })
        }
        if(vote === 'downVote'){
            axiosSecure.delete('/removeDownVote', {params:{uid:user?.uid,postId}})
        .then(()=>{
                setVote('noVote')
        })
        }
    }




    if(post && vote && upVotes && downVotes){

    return(
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">

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
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{texts?.slice(0,150)}{texts.length > 150? '...' :''}</p>
        <div className='flex justify-between '>
            <div className='flex gap-5 items-center'>
            <div className={`${vote === 'upVote'? 'bg-blue-500 hover:bg-blue-300' : 'bg-bgCommon hover:bg-bgHover'} p-2 flex items-center gap-2 rounded-md cursor-pointer text-white font-bold`} onClick={()=> user? upVote() : navigate('/login')}>
            <FaArrowUp className='text-xl ' />
                <p>{upVotes?.allUpVotes}</p>
            </div>
            <div className={`${vote === 'downVote'? 'bg-red-500 hover:bg-red-300' : 'bg-bgCommon hover:bg-bgHover'} p-2 flex items-center gap-2 rounded-md cursor-pointer text-white font-bold`}  onClick={()=> user? downVote() : navigate('/login')}>
            <FaArrowDown className='text-xl' />
            <p>{downVotes?.allDownVotes}</p>
            </div>
            </div>
            <Link to={`/forum/post/${_id}`}><button className='btn'>View Post</button></Link>
        </div>
    </article>
    )}

    return   <div className="skeleton h-32 w-full"></div>
}