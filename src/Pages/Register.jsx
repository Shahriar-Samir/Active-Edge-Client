import { useContext } from 'react';
import {toast,ToastContainer} from 'react-toastify'
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const Register = () => {
    const {signup,setLoading,updateUser} = useContext(AuthContext)
    const submit = (e)=>{
      e.preventDefault()
      const form = e.target
      const name= form.name.value
      const email= form.email.value
      const photoUrl = form.photoUrl.value
      const password = form.password.value
      if(password.length < 6 || /[A-Z]/.test(password) === false || /[a-z]/.test(password) === false){
        toast.error('Password must have an uppercase and lowercase letter with at least 6 characters')
       }
       else{
          signup(email,password)
          .then(res=>{
            updateUser({photoURL:photoUrl,displayName:name})
            .then(()=>{
              useAxiosSecure.post('/addUser',{name:'sdfds'})
                .then(()=>{
                  setLoading(false)
                  toast.success('You have created a new account successfully')
                })
            
            })
          })
          .catch(err=>{
            setLoading(false)
            toast.error('Something went wrong')
            console.log(err)
          })
       }
    }

    return (
        <div>
          <ToastContainer/>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={submit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          <input type="text" placeholder="user name" name='name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Photo</span>
          </label>
          <input type="text" placeholder="photo URL" name='photoUrl' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Create an account</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;