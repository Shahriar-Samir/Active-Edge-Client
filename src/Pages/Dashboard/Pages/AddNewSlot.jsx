import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {toast, ToastContainer} from 'react-toastify'
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import Select from 'react-select'


const AddNewSlot = () => {
      const axiosSecure = useAxiosSecure()
      const presentTime = new Date();
      const {user} = useContext(AuthContext)

      const {data:userInfo} = useQuery({
        queryKey:["userInfo"],
        queryFn: ()=>
            axiosSecure.get(`/user/${user.uid}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })


    const {data: allClasses} = useQuery({
        queryKey: ['allClasses'],
        queryFn: ()=>
            axiosSecure.get('/allClasses')
            .then(res=>{
                return  res.data
            })
    })
  


  const days = userInfo?.days.map(item=>{
        return {value:item,label:item}
  })
  const classes = allClasses?.map(item=>{
        return {value:item.className,label:item.className}
  })


  const [selectedClasses,setSelectedClasses] = useState([])
  const [selectedDays,setSelectedDays] = useState([])

  const changeSelectedClasses = (e)=>{
            const classes = e.map(item=>{
                return item.value
            })
            setSelectedClasses(classes)
  }


  const changeSelectedDays = (e)=>{
        const allDays = e.map(item=>{
                return item.value
            })
            setSelectedDays(allDays)
  }

  
  const postSubmit = (e)=>{
    e.preventDefault()
    const form = e.target
    const slotName = form.slotName.value
    const slotTime = form.slotTime.value
    const {uid, email,displayName} = user

    if(selectedDays.length < 1 || selectedClasses.length < 1){
    toast.error('Please fill up the form')
    }
    else{
        axiosSecure.post('/addSlot',{date:presentTime.toLocaleString(),uid,displayName,email,selectedDays,slotName,slotTime,selectedClasses})
        .then(res=>{
             toast.success('Added Slot Successfully!')
        })
        .catch(()=>{
             toast.error('Something went wrong')
        })
    }
}




    return (
        <div>
          <ToastContainer/>
           <h1 className='text-xl text-center font-bold mt-5'>Add New Slot</h1>
           <form className="card-body w-11/12 max-w-[600px] mx-auto " onSubmit={postSubmit}>
        <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" defaultValue={user?.displayName} disabled className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text"  name="email" defaultValue={user?.email} disabled className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Days</span>
          </label>
          <Select  isMulti  className=""
options={days} name="selectedDays" onChange={changeSelectedDays} ></Select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Slot Name</span>
          </label>
          <input type="text" placeholder="Slot name" name="slotName" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Slot Time</span>
          </label>
          <input type="text" placeholder="Slot time" name="slotTime" className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Class</span>
          </label>
          <Select  isMulti  className=""
options={classes} name="selectedClasses" onChange={changeSelectedClasses}></Select>
        </div>
        
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Post</button>
        </div>
      </form>
        </div>
    );
};

export default AddNewSlot;