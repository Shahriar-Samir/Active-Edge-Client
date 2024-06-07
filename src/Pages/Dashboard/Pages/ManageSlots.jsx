import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

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
    return (
        <div>
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
                    return (  <tr key={item._id} id={item._id} >
                     
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
                      <button className="btn" onClick={()=>document.getElementById(item._id).showModal()}>open modal</button>
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

export default ManageSlots;