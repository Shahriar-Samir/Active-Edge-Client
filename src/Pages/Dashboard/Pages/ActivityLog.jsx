import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaWpforms } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";

const ActivityLog = () => {
    const {user} = useContext(AuthContext)
    
    const axiosSecure = useAxiosSecure()
    const {data:applications} = useQuery({
        queryKey:["applicationStatus"],
        queryFn: ()=>
            axiosSecure.get(`/userApplications`, {params:{uid:user?.uid}})
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })

    const {data:application} = useQuery({
        queryKey:["application"],
        queryFn: ()=>
            axiosSecure.get(`/application`, {params:{uid:user?.uid}})
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })

    console.log(application)
    return (
        <div className='w-full'>
            {    applications?  
                <div className=''>
                    <h1 className='text-2xl text-center mt-5 font-bold'>Activity Log</h1>
                    <div className='grid grid-cols-1 gap-3 mt-4'>

                    {
                       application? <div key={application._id} className=" bg-base-100 shadow-xl ps-4 w-10/12 mx-auto flex items-center justify-between p-3">
                       <div className='flex items-center gap-4'>
                       <img src={application.image} className='w-[80px] h-[80px]'/>
                       <div>
                       <h1 className=''><span className='font-bold'>Full Name</span>: {application.fullName}</h1>
                       <h1 className='text-sm mt-2'><span className='font-bold'>ApplicationID:</span> {application._id}</h1>
                       <h1 className='text-sm mt-2'><span className='font-bold'>Apply Date:</span> {application.applyDate}</h1>
                       </div>
                       </div>
                       <div className='flex flex-col justify-between h-full'>
                       <h1 className='text-sm text-gray-400 font-semibold'>{application.applyDate}</h1>
                       {
                          application.status === 'rejected'?  <div className='mt-3 flex items-center gap-2'>
                           <h1 className='text'>Status: <span className='text-red-600 font-bold'>Rejected</span></h1>
                           <button className=''><FaEye/></button>
                          </div> : <h1 className=''>Status: <span className='text-warning font-bold'>Pending</span></h1> 
                       }
                       </div>
                     </div>
                     :
                     ''
                    }


                    {
                        applications.map(item=>{
                            return <div key={item._id} className=" bg-base-100 shadow-xl ps-4 w-10/12 mx-auto flex items-center justify-between p-3">
                            <div className='flex items-center gap-4'>
                            <img src={item.image} className='w-[80px] h-[80px]'/>
                            <div>
                            <h1 className=''><span className='font-bold'>Full Name</span>: {item.fullName}</h1>
                            <h1 className='text-sm mt-2'><span className='font-bold'>ApplicationID:</span> {item._id}</h1>
                            <h1 className='text-sm mt-2'><span className='font-bold'>Apply Date:</span> {item.applyDate}</h1>
                            </div>
                            </div>
                            <div className='flex flex-col justify-between h-full'>
                            <h1 className='text-sm text-gray-400 font-semibold'>{item.applyDate}</h1>
                            {
                               item.status === 'rejected'?  <div className='mt-3 flex items-center gap-2'>
                                <h1 className='text'>Status: <span className='text-red-600 font-bold'>Rejected</span></h1>
                                <button className=''><FaEye/></button>
                               </div> : <h1 className=''>Status: <span className='text-warning font-bold'>Pending</span></h1> 
                            }
                            </div>
                          </div>
                        })
                    }
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