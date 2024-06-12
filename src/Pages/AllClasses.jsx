import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic()
    const classesPerPage = 6
    const [currentPage,setCurrentPage] = useState(0)
    const [currentButtons,setCurrentButtons]= useState(0)
    const [searchValue,setSearchValue] = useState('')

    const {data,isFetching} = useQuery({
        queryKey:[currentPage,searchValue],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get(`/allClasses?page=${currentPage}&size=${classesPerPage}&searchValue=${searchValue===''? 'false' : searchValue}`)
            .then(res=>{
                return  res.data
            })
        
    })

    const {data:classesCount,isFetching:fetching2} = useQuery({
        queryKey:["classesCount"],
        initialData: {},
        queryFn: ()=>
            axiosPublic.get('/classesCount')
            .then(res=>{
                return res.data
            })
    })



    if(isFetching || fetching2){
        return <Loading></Loading>
    }

    const numberOfPages = Math.ceil(classesCount?.classesLength / classesPerPage)
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
    const searchClasses = (e)=>{
            e.preventDefault()
            const sv = e.target.search.value
            setSearchValue(sv)
    }

    return (
        <div className='mx-auto w-11/12 max-w-[1200px]'>
            <Helmet>
                <title>Active Edge || All Classes</title>
            </Helmet>
             <div className=''>
                           <ToastContainer/>
                <p className='mt-5 text-3xl font-bold text-center'>All Classes</p>
    {data.length < 1? <div className='h-[80vh] flex justify-center items-center'>
        <h1 className='text-center font-bold text-xl'>There are no class available</h1>
    </div>:
            <div>
                     <form className="w-11/12 max-w-md mx-auto mt-5" onSubmit={searchClasses}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search classes" name='search' />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-bgCommon hover:bg-bgHover font-medium rounded-lg text-sm px-4 py-2" >Search</button>
                </div>
            </form>
                <div className='grid grid-cols-2 gap-10 mx-auto mt-10'>
            {data?.map(item=>{
                return <Class key={item?._id} ClassItem={item}/>
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
        </div>
    );
};

export default AllClasses;

const Class = ({ClassItem})=>{
    const {className,details,bookings,image,trainers} = ClassItem
    return (
        <div className="flex bg-base-100 shadow-xl rounded-xl">
  <figure className='w-1/3'><img src={image} className='w-full h-full object-cover rounded-s-xl'/></figure>
  <div className="w-2/3 p-5 flex flex-col justify-between">
    <div>
    <h2 className="text-2xl font-bold">{className}</h2>
    <p>{details}</p>  
    </div>
    <div className="card-actions justify-between items-center mt-4">
    <p className='text-lg'><span className='font-bold'>Booking:</span> {bookings}</p>
    {trainers.length > 5? <div className='flex gap-2 items-center'>
        {trainers?.slice(0,5).map((item,index)=>{
            return <Link key={index} to={`/profile/${item.trainerUid}`}><img src={item.trainerPhotoURL} className='w-[30px] h-[30px] rounded-full object-cover'/></Link>
        })}
                <Link to='/allTrainers'><p className='text-sm font-bold'>more+</p></Link>
    </div>
    :
    <div className='flex gap-2 items-center'>
    {trainers?.map((item,index)=>{
        return <Link key={index} to={`/profile/${item.trainerUid}`}><img src={item.trainerPhotoURL} className='w-[30px] h-[30px] rounded-full object-cover'/></Link>
    })}
</div>}
    </div>
  </div>
</div>
    )
}