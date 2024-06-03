import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import {toast,ToastContainer} from 'react-toastify'

const AddNewClass = () => {
  const axiosSecure = useAxiosSecure()

  const addNewClass = (e)=>{
        e.preventDefault()
        const form = e.target
        const className = form.className.value
        const image = form.imageURL.value
        const details = form.details.value
        axiosSecure.post('/addClass',{className,image,details})
        .then(()=>{
            toast.success('New Class Created Successfully')
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
  }
    return (
        <div>
          <ToastContainer/>
           <h1 className='text-xl text-center font-bold mt-5'>Add New Class</h1>
           <form className="card-body w-11/12 max-w-[400px] mx-auto" onSubmit={addNewClass}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input type="text" name='className' placeholder="Class Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="text" name='imageURL' placeholder="Image URL" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Details</span>
          </label>
          <textarea type="email" placeholder="details" name='details' className="input input-bordered min-h-[30vh] max-h-[30vh]" required></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Add Class</button>
        </div>
      </form>
        </div>
    );
};

export default AddNewClass;