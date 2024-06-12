import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AddFeedBack = () => {
    const axiosSecure = useAxiosSecure()
      const presentTime = new Date();
      const {user} = useContext(AuthContext)


  const postSubmit = (e)=>{
        e.preventDefault()
        const form = e.target 
        const title = form.title.value
        const texts = form.texts.value
        const rating = parseInt(form.rating.value)
        const {uid, email, photoURL, displayName} = user
       axiosSecure.post('/addFeedBack',{title,texts, date:presentTime.toLocaleString(),uid,email,photoURL,displayName,rating})
       .then(()=>{
            toast.success('Thanks for your feedback')
       })
       .catch(()=>{
            toast.error('Something went wrong')
       })
  }

    return (
        <div>
            <Helmet>
                <title>Active Edge | Add Feedback</title>
            </Helmet>
          <ToastContainer/>
           <h1 className='text-xl text-center font-bold mt-5'>Your Review</h1>
           <form className="card-body w-11/12 max-w-[600px] mx-auto" onSubmit={postSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="Title" name="title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Give us your feedback</span>
          </label>
          <textarea placeholder="write your feedback in 200 characters" name="texts" className="input input-bordered min-h-[17vh] h-[17vh] max-h-[17vh] p-4" maxLength={200} required ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rate us</span>
          </label>
          <div className="rating">
  <input type="radio" name="rating" value='1' className="mask mask-star-2 bg-orange-400" defaultChecked />
  <input type="radio" name="rating" value='2' className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating" value='3' className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating" value='4' className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating" value='5' className="mask mask-star-2 bg-orange-400" />
</div>
        </div>
        
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
        </div>
    );
};

export default AddFeedBack;