import React from 'react';
import Heading from '../../Components/Heading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const axiosSecure = useAxiosSecure()

  const subscribe = (e)=>{
      e.preventDefault()
      const form = e.target 
      const name = form.name.value
      const email = form.email.value
      axiosSecure.post('/addSubscriber', {name,email})
      .then(()=>{
        toast.success('Thanks for subscribing!')
      })
      .catch(()=>{
        toast.error('Something went wrong')
      })
  }

    return (
       <div className='mt-28 mx-auto w-11/12 max-w-[1200px]'>
        <div className="flex justify-between items-center flex-col lg:flex-row gap-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Stay Updated with Our Newsletter</h1>
            <p className="py-6 text-xl ">Join our newsletter to receive the latest updates on fitness tips, workout routines, nutrition advice, and exclusive offers. Stay connected with our community and never miss out on any exciting news or events. Subscribe now and take a step towards a healthier, more active lifestyle!</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={subscribe}>
              <h1 className='text-2xl text-center font-bold'>Subscribe Newsletter</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="Email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-bgCommon text-white hover:bg-bgHover">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
       </div>
    );
};

export default Newsletter;