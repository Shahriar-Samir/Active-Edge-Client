import { useContext, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {toast, ToastContainer} from 'react-toastify'
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const AddNewSlot = () => {
      const axiosSecure = useAxiosSecure()
      const presentTime = new Date();
      const navigate = useNavigate()
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
            axiosSecure.get('/allClassesName')
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
    const {uid, email,displayName,photoURL} = user

    if(selectedDays.length < 1 || selectedClasses.length < 1){
    toast.error('Please fill up the form')
    }
    else{
        axiosSecure.post('/addSlot',{date:presentTime.toLocaleString(),uid,displayName,email,selectedDays,slotName,slotTime,selectedClasses})
        .then(res=>{
          axiosSecure.put('/updateClasses', {selectedClasses,uid,displayName,photoURL,slotName})
          .then(()=>{
            toast.success('Added Slot Successfully!')
            navigate(`/profile/${uid}`)
          })
        })
        .catch(()=>{
             toast.error('Something went wrong')
        })
    }
}




    return (
        <div>
            <Helmet>
                <title>Active Edge | Add Slot</title>
            </Helmet>
          <ToastContainer/>
           <h1 className='text-xl text-center font-bold mt-5'>Add New Slot</h1>
           <form className="card-body w-11/12 max-w-[600px] mx-auto " onSubmit={postSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input type="text" name="name" defaultValue={user?.displayName} disabled className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input type="text"  name="email" defaultValue={user?.email} disabled className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Select Days</span>
          </label>
          <Select  isMulti  className=""
options={days} name="selectedDays" onChange={changeSelectedDays} ></Select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Slot Name</span>
          </label>
          <input type="text" placeholder="Slot name" name="slotName" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Slot Time (hour)</span>
          </label>
          <input type="number" max={8} min={1} placeholder="Slot time(hour)" name="slotTime" className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Select Class</span>
          </label>
          <Select  isMulti  className=""
options={classes} name="selectedClasses" onChange={changeSelectedClasses}></Select>
        </div>
        
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-bgCommon text-white font-semibold hover:bg-bgHover">Add Slot</button>
        </div>
      </form>
        </div>
    );
};

export default AddNewSlot;