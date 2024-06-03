import React from 'react';
import {useQuery} from '@tanstack/react-query'
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { formatDistanceToNow } from 'date-fns';

const Forum = () => {
    const axiosSecure = useAxiosSecure()
    const {data} = useQuery({
        queryKey:["posts"],
        queryFn: ()=>
            axiosSecure.get('/forumPosts')
            .then(res=>{
                return res.data
            })
    })

    return (
        <div className='w-11/12 mx-auto max-w-[1200px]'>
<div className='flex flex-col max-w-[700px] gap-5 mx-auto'>
        {data?.map(item=>{
            return <Post post={item}/>
        })}
        </div>
        </div>
    );
};

export default Forum;

const Post = ({post})=>{
    const {texts,title,date} = post
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

    return(
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            
        <div className="flex justify-between items-center mb-5 text-gray-500">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                <span className="font-medium ">
                    Jese Leos
                </span>
            </div>
        </div>
            <span className="text-sm">{timeAgo}</span>
        </div>
        <h2 className="mb-2 text-lg font-bold "><a href="#">{title}</a></h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{texts}</p>
    </article>
    )
}