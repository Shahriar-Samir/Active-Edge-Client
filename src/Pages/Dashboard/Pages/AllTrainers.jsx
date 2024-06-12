import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AllTrainers = () => {
    const okay = false
    const axiosSecure = useAxiosSecure()
    const {data} = useQuery({
        queryKey:["posts"],
        queryFn: ()=>
            axiosSecure.get('/trainers')
            .then(res=>{
                return res.data
            })
    })


    const removeAsTrainer = (user)=>{
      axiosSecure.put('/removeTrainer',user)
      .then(()=>{
          toast.success(`${user.displayName} has been removed from trainer role`)
          document.getElementById(user._id).style.display = 'none'
      })
      .catch(()=>{
          toast.error('Something went wrong')
      })
      return 
    }

    return (
        <div className='w-full'>
            <Helmet>
                <title>Active Edge | All Trainers</title>
            </Helmet>
          <ToastContainer/>
            <h1 className='text-2xl font-bold text-center border-b pb-3'>All the Trainers</h1>
            {
                okay === true? 
                <div className='text-center text-lg mt-4'>
                    <h1>There are no trainers available</h1>
                </div> 
                : 
                <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Skills and available days</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                  {data?.map(item=>{
                    return (  <tr key={item._id} id={item._id} >
                     
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.photoURL} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.displayName}</div>
                            <div className="text-sm opacity-50 font-semibold">{item.email}</div>
                            <div className="text-sm opacity-50 font-semibold">{item.time}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
                        {item?.skills?.map(skill=>{
                          return <button className='text-xs cursor-text py-[2px] px-[3px] rounded-lg bg-gray-100' key={skill}>{skill}</button>
                        })}
                        </div>
                        <div className='grid grid-cols-3 md:grid-cols-7 gap-2 mt-3'>
                        {item?.days?.map(day=>{
                          return <button className='text-xs cursor-text py-[2px] px-[3px] rounded-lg bg-gray-100 font-semibold' key={day}>{day}</button>
                        })}
                        </div>
                      </td>
                      <td className=''>
                        <button className="btn p-2 text-xs bg-red-500 text-white" onClick={()=>{removeAsTrainer(item)}}>Remove</button>
                      </td>
                    </tr>)
                  })}
                  </tbody>
                </table>
              </div>
            }
        </div>
    );
};

export default AllTrainers;