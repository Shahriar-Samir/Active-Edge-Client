import React, { useEffect, useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';


const Forum = () => {
    const axiosPublic = useAxiosPublic()
    const {data:posts,isFetching} = useQuery({
        queryKey:["posts"],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get('/forumPosts')
            .then(res=>{
                console.log(res.data)
                return res.data
            })
    })

    if(isFetching){
        return <Loading/>
    }
    return (
        <div className='w-11/12 mx-auto max-w-[1200px]'>
<div className='flex flex-col max-w-[700px] gap-5 mx-auto'>
        {posts?.map(item=>{
            return <Post key={item?._id} post={item}/>
        })}
        </div>g
        </div>
    );
};

export default Forum;

const Post = ({post})=>{
    const {texts,title,date,displayName,photoURL,role} = post
    const [timeAgo,setTimeAgo] = useState('Loading...')

    useEffect(()=>{
       
        if(date){
            setInterval(()=>{
                setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }))
        },1000)
        }
    },[date])

    return(
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            
        <div className="flex justify-between items-center mb-5 text-gray-500">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full object-cover" src={photoURL} alt={displayName} />
                <span className="font-medium ">
                    {displayName}
                </span>
                <p>Role: {role}</p>
            </div>
        </div>
            <span className="text-sm">{timeAgo}</span>
        </div>
        <h2 className="mb-2 text-lg font-bold "><p>{title}</p></h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{texts}</p>
    </article>
    )
}