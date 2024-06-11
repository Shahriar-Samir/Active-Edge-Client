import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic()
    const classesPerPage = 6
    const [currentPage,setCurrentPage] = useState(0)
    const [currentButtons,setCurrentButtons]= useState(0)

    const {data,isFetching} = useQuery({
        queryKey:[currentPage],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get(`/allClasses?page=${currentPage}&size=${classesPerPage}`)
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

    return (
        <div className='mx-auto w-11/12 max-w-[1200px]'>
             <div className=''>
                           <ToastContainer/>
                <p className='mt-5 text-3xl font-bold text-center'>Forum Posts</p>
    {data.length < 1? <div className='h-[80vh] flex justify-center items-center'>
        <h1 className='text-center font-bold text-xl'>There are no post available</h1>
    </div>:
            <div>
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