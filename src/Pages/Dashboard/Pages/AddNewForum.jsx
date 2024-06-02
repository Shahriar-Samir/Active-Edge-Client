import React from 'react';

const AddNewForum = () => {
    return (
        <div>
           <h1 className='text-xl text-center font-bold mt-5'>Add New Forum</h1>
           <form className="card-body w-11/12 max-w-[600px] mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="Class Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Post</span>
          </label>
          <textarea placeholder="Image" className="input input-bordered min-h-[30vh] h-[35vh] max-h-[40vh] p-4" required ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
        </div>
    );
};

export default AddNewForum;