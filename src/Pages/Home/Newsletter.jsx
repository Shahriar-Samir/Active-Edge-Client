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
       <div>
        <Heading title={'News Letter'} details={'This is newsletter section'}/>
         <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Subscribe now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={subscribe}>
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
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
       </div>
    );
};

export default Newsletter;