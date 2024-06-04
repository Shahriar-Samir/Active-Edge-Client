import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {toast, ToastContainer} from 'react-toastify'

const AppliedTrainer = () => {
    const okay = false
    const axiosSecure = useAxiosSecure()

    const {data} = useQuery({
      queryKey: ['featuredClasses'],
      queryFn: ()=>
          axiosSecure.get('/applications')
          .then(res=>{
              return  res.data
          })
  })

  const confirmApplication = (applicantData)=>{
    const presentTime = new Date()
          applicantData.startedDate = presentTime.toLocaleString()
         axiosSecure.post('/confirmApplication', {applicantData})
        .then(()=>{
          axiosSecure.delete(`/deleteApplication/${applicantData._id}`)
          .then(()=>{
            toast.success(`Trainer application confirmed for ${applicantData.fullName}!`)
            document.getElementById(applicantData._id).style.display = 'none'
          })
        })
        .catch(()=>{
            toast.error('Something went wrong!')
        })
  }

  const rejectApplication = (application)=>{
        axiosSecure.put(`/rejectApplication`,application)
        .then(()=>{
          document.getElementById(application._id).style.display = 'none'
          toast.success('Application has been rejected')
        })
        .catch(()=>{
          toast.error('Something went wrong')
        })
      
  }


    return (
        <div className='w-full'>
            <ToastContainer/>
              <h1 className='text-2xl font-bold text-center border-b pb-3'>All the applications</h1>
              {
                okay?
                <div>

                </div>
                :
                <div className='grid grid-cols-2 gap-5 px-10 mt-5'>
                        {data?.map((item,index)=>{
                            if(item.status === 'pending'){
                              return <div id={item._id} key={item._id} className="flex justify-between items-center bg-base-100 shadow-xl gap-5 p-4">
                                <img src={item.image} className='w-[50px] h-[50px]'/>
                              <div>
                              <p><span className="font-bold">Full name:</span> {item.fullName}</p>
                              <p><span className="font-bold">Email:</span> {item.email}</p>
                              </div>
                              <div className="card-actions justify-end">
                                <button className="btn" onClick={()=>document.getElementById("modal_"+item._id).showModal()}><FaEye/></button>
  <dialog id={"modal_"+item._id} className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div>
    <div className="w-full flex gap-5">
        <div>
        <img className="w-[120px] h-[120px] object-cover" src={item.image}/>
        </div>
        <div>
        <h1 className="text-lg"><span className="font-bold">Full Name:</span> {item.fullName}</h1>
        <h1 className="text-lg"><span className="font-bold text-lg">Email:</span> {item.email ? item.email : 'Unknown'}</h1>
        <h1 className="text-lg"><span className="font-bold">Age:</span>  {item.age} years</h1>
        <h1 className="text-lg"><span className="font-bold">Apply Date:</span><span> {item.applyDate}</span>
        </h1>
        </div>
    </div>
    <h1 className="mt-3"><span className="font-bold">Skills:</span> 
          <div className="grid grid-cols-3 gap-4 mt-2">
          {
            item?.skills.map(skill=>{
              return <button className="cursor-default p-2 rounded-lg bg-gray-200 font-semibold text-xs">{skill}</button>
            })
          }
          </div>
        </h1>
    <h1 className="mt-4 flex  gap-5">
      <span className="font-bold">Available days:</span> 
          <div className="grid grid-cols-7 gap-2 ">
          {
            item?.days.map(day=>{
              return <button className="cursor-default p-1 rounded-lg bg-gray-100 font-semibold text-xs">{day}</button>
            })
          }
          </div>
        </h1>
        <h1 className="mt-2 flex gap-4 items-center"><span className="font-bold">Available time:</span><span className="text-sm font-semibold">{item?.time}</span></h1>
    <div className="flex gap-5 mt-4 justify-end">
    <form method="dialog">
        <button className="btn"onClick={()=> confirmApplication(item)}>Confirm</button>
    </form>     
        <form method="dialog">
        <button className="btn" onClick={()=> rejectApplication(item)}>Reject</button>
    </form>
    </div>
    </div>
  </div>
</dialog>
                            </div>
                          </div>
                            }
                        })}
                </div>
              }
        </div>
    );
};

export default AppliedTrainer;