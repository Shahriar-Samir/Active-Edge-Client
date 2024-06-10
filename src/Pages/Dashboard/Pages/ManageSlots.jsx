import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

const ManageSlots = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data:slots} = useQuery({
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


    return (
        <div>
            <ToastContainer/>
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
                        <div className='grid grid-cols-5 gap-2'>
                        {item?.selectedClasses?.map(skill=>{
                          return <button className='text-xs cursor-text py-[2px] px-[3px] rounded-lg bg-gray-100' key={skill}>{skill}</button>
                        })}
                        </div>
                        <div className='grid grid-cols-7 gap-2 mt-3'>
                        {item?.selectedDays?.map(day=>{
                          return <button className='text-xs cursor-text py-[2px] px-[3px] rounded-lg bg-gray-100 font-semibold' key={day}>{day}</button>
                        })}
                        </div>
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