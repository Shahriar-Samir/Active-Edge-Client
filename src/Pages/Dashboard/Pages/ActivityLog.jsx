import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEye, FaWpforms } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import Loading from '../../../Components/Loading';
import { Helmet } from 'react-helmet-async';

const ActivityLog = () => {
    const {user} = useContext(AuthContext)
    
    const axiosSecure = useAxiosSecure()
    const {data:applications,isFetching:fetchingApplications} = useQuery({
        queryKey:["applications"],
        queryFn: ()=>
            axiosSecure.get(`/userApplications`, {params:{uid:user?.uid}})
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })

    const {data:application, isFetching:fetchingApplication} = useQuery({
        queryKey:["application"],
        queryFn: ()=>
            axiosSecure.get(`/application/${user?.uid}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })

    if(fetchingApplication || fetchingApplications){
        return <Loading/>
    }
  
    console.log(applications)

    return (
        <div className='w-full'>
                   <Helmet>
                <title>Active Edge | Activity Log</title>
            </Helmet>
            {    applications.length > 0 || application?  
                <div className=''>
                    <h1 className='text-2xl text-center mt-5 font-bold'>Activity Log</h1>
                    <h1 className='text-center mt-3'>Your previous application status</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-4 md:w-11/12 mx-auto'>

                    {
                       application? <div key={application._id} className=" bg-base-100 shadow-xl ps-4 w-11/12 max-w-[300px] md:w-full md:max-w-[700px] mx-auto flex flex-col lg:flex-row items-center justify-between p-3 rounded-lg border-2 border-warning">
                       <div className='flex items-center gap-4'>
                       <img src={application.image} className='w-[80px] h-[80px] object-cover rounded-full'/>
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
                            return <div key={item._id} className=" bg-base-100 shadow-xl ps-4 w-11/12 max-w-[300px] md:w-full md:max-w-[700px] flex flex-col lg:flex-row mx-auto items-center justify-between p-3 rounded-lg border-2 border-red-600">
                            <div className='flex items-center gap-4'>
                            <img src={item.image} className='w-[80px] h-[80px] rounded-full'/>
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
                                <button className="btn" onClick={()=>document.getElementById(item._id).showModal()}><button className=''><FaEye/></button></button>
                               </div> : <h1 className=''>Status: <span className='text-warning font-bold'>Pending</span></h1> 
                            }
                            </div>
                            <dialog id={item._id} className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-red-600">Your application has been rejected!</h3>
    <div>
        <p className="mt-3"><span className='font-bold'>Admin's feedback: </span>{item.feedback}</p>
    </div>
    <form method="dialog" className='flex justify-end'>
      <button className="py-2 px-5 bg-red-600 text-white mt-4 rounded">Close</button>
    </form>
  </div>
  
</dialog>
                          </div>
                        })
                    }
                </div>
                </div>
                    :
                    <div>
                               <h1 className='text-2xl text-center mt-5 font-bold'>Activity Log</h1>
                        <h1 className='text-center mt-5'>There are no applications you have applied</h1>
                    </div>
                }
        </div>
    );
};

export default ActivityLog;