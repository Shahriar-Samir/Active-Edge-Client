import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Loading from '../../../Components/Loading';

const ManageSlots = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data:slots, isFetching} = useQuery({
        queryKey:["slots"],
        queryFn: ()=>
            axiosSecure.get(`/trainerSlots/${user?.uid}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })
    console.log(slots)
    const okay =false


    const deleteSlot = (item)=>{
        const {displayName,uid,photoURL} = user
        const {selectedClasses} = item
        axiosSecure.delete(`/deleteSlot/${item._id}`)
        .then(res=>{
            axiosSecure.put('/removeClassTrainer',{displayName,photoURL,uid,selectedClasses})
            .then(()=>{
              document.getElementById(item._id).style.display = 'none'
            toast.success("Slot deleted Successfully")
            })
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
    }

    if(isFetching){
      return <Loading/>
    }

    return (
        <div>
            <Helmet>
                <title>Active Edge | Manage Slots</title>
            </Helmet>
            <ToastContainer/>
             {
                slots?.length < 1? 
                <div className='text-center text-lg mt-4'>
                  <h1 className='text-center text-3xl font-bold'>Manage Slots</h1>
                    <h1 className='text-center mt-5'>There are no slots available</h1>
                </div> 
                : 
                <div className="overflow-x-auto">
                   <div className='text-center text-lg mt-4'>
                  <h1 className='text-center text-3xl font-bold'>Manage Slots</h1>
                </div> 
                <table className="table mt-6">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Skills and available days</th>
                      <th>Booking Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                  {slots?.map(item=>{
                    return (  
                    <>
                          <dialog id={'modal'+item._id} className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">Are you sure you want to delete this slot ?</h3>
    <div className='flex gap-5 mt-7 justify-center'>
    <form method='dialog'>
    <button className="btn  bg-red-500 text-white" onClick={()=>{deleteSlot(item)}}>Delete</button>
    </form>
    <form method='dialog'>
    <button className="btn ">Cancel</button>
    </form>
    </div>
  </div>
</dialog>
                    <tr key={item._id} id={item._id} >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.photoURL} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.slotName}</div>
                            <div className="text-sm opacity-50 font-semibold">{item.email}</div>
                            <div className="text-sm opacity-50 font-semibold">{item.slotTime}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2'>
                        {item?.selectedClasses?.map(skill=>{
                          return <button className='text-xs cursor-text py-[2px] px-[3px] rounded-lg bg-gray-100' key={skill}>{skill}</button>
                        })}
                        </div>
                        <div className='grid grid-cols-3 md:grid-cols-7 gap-2 mt-3'>
                        {item?.selectedDays?.map(day=>{
                          return <button className='text-xs cursor-text py-[2px] px-[3px] rounded-lg bg-gray-100 font-semibold' key={day}>{day}</button>
                        })}
                        </div>
                      </td>
                        <td>
                          <div>{
                            item.status === 'unselected'? <p className='font-bold'>Unselected</p>
                            : 
                            <>
                            <p>Status: <span className='text-green-500 font-bold'>{item.status}</span></p>
                            <p>Booked By: <span className='font-bold'>{item.memberName}</span> </p>
                          
                            <p>Type: <span className='font-bold'>{item.type}</span>
                            </p>                           
                             </>  
                          }</div>
                        </td>
                      <td className=''>
                      <button className="btn p-2 text-xs bg-red-500 text-white" onClick={()=>document.getElementById('modal'+item._id).showModal()}>Remove</button>
                      </td>
                    </tr>
                    </>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            }
        </div>
    );
};

export default ManageSlots;