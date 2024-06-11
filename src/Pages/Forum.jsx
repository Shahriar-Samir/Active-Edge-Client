import React, { useEffect, useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';


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