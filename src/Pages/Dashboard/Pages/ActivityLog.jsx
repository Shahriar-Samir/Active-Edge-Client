import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaWpforms } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

const ActivityLog = () => {
    const {user} = useContext(AuthContext)
    
    const axiosSecure = useAxiosSecure()
    const {data:application} = useQuery({
        queryKey:["applicationStatus"],
        queryFn: ()=>
            axiosSecure.get(`/application/${user?.uid}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })


    return (
        <div className='w-full'>
            <h1 className='mt-5 font-bold text-3xl text-center'>Activity Log</h1>
                {
                    application? <div className='w-full flex justify-center mt-6'>
                        <div className='w-[500px] flex flex-col items-center gap-3'>
                             <div className='flex w-full items-center justify-center'>
                             <h1 className="font-semibold text-xl w-full">Status: {application.status === 'pending'? <span className='text-orange-400 text-lg'>Pending</span> : <span className='text-red-500 text-lg'>Rejected</span>}</h1>
                             {application.status === 'rejected'? <FaEye onClick={''}/> : ''}
                             </div>
                        <img className="w-[120px] h-[120px] object-cover" src={application.image}/>
                        <div>
                        <h1 className="text-sm "><span className="font-semibold">Application Id:</span> {application._id}</h1>
                        <h1 className="text-lg mt-4"><span className="font-bold">Full Name:</span> {application.fullName}</h1>
                        <h1 className="text-lg"><span className="font-bold text-lg">Email:</span> {application.email ? application.email : 'Unknown'}</h1>
                        <h1 className="text-lg"><span className="font-bold">Age:</span>  {application.age} years</h1>
                        <h1 className="text-lg"><span className="font-bold">Apply Date:</span><span> {application.applyDate}</span>
                        </h1>
                        </div>
                    <h1 className="mt-3 text-center"><span className="font-bold ">Skills:</span> 
                          <div className="flex gap-4 mt-2">
                          {
                            application?.skills.map(skill=>{
                              return <button className="cursor-default p-2 rounded-lg bg-gray-200 font-semibold text-xs">{skill}</button>
                            })
                          }
                          </div>
                        </h1>
                    <h1 className="mt-4 flex flex-col items-center gap-2">
                      <span className="font-bold text-center">Available days:</span>
                          <div className="flex gap-2 ">
                          {
                            application?.days.map(day=>{
                              return <button className="cursor-default p-1 rounded-lg bg-gray-100 font-semibold text-xs">{day}</button>
                            })
                          }
                          </div>
                        </h1>
                        <h1 className="mt-2 flex items-center gap-3 applications-center"><span className="font-bold">Available time:</span><span className="text-sm font-semibold">{application?.time}</span></h1>
                    <div className="flex gap-5 mt-4 justify-end">
  
                    </div>

                    </div>
                    
                    </div>
                    :
                    <div>
                        <h1 className='text-center mt-5'>There are no applications you have applied</h1>
                    </div>
                }
        </div>
    );
};

export default ActivityLog;