import React from 'react';

const AddNewClass = () => {
    return (
        <div>
           <h1 className='text-xl text-center font-bold mt-5'>Add New Class</h1>
           <form className="card-body w-11/12 max-w-[400px] mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input type="text" placeholder="Class Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="text" placeholder="Image" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Details</span>
          </label>
          <input type="email" placeholder="details" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
        </div>
    );
};

export default AddNewClass;