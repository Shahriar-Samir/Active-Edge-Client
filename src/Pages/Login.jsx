import { useContext } from 'react';
import {toast,ToastContainer} from 'react-toastify'
import { AuthContext } from '../Providers/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";

const Login = () => {
    const {signin,setLoading,googleAuth,facebookAuth,githubAuth} = useContext(AuthContext)

    const googleSignin = ()=>{
        googleAuth()
        .then(()=>{
          setLoading(false)
          toast.success('You have logged in successfully')
        })
        .catch(()=>{
          setLoading(false)
            toast.error('Something went wrong')
        })
    }
    const githubSignin = ()=>{
        githubAuth()
        .then(()=>{
          setLoading(false)
          toast.success('You have logged in successfully')
        })
        .catch(()=>{
          setLoading(false)
            toast.error('Something went wrong')
        })
    }
    const facebookSignin = ()=>{
        githubAuth
        .then(()=>{
          setLoading(false)
          toast.success('You have logged in successfully')
        })
        .catch(()=>{
          setLoading(false)
            toast.error('Something went wrong')
        })
    }

    const submit = (e)=>{
      e.preventDefault()
      const form = e.target
      const email= form.email.value
      const password = form.password.value
          signin(email,password)
          .then(res=>{
            setLoading(false)
            toast.success('You have logged in successfully')
          })
          .catch(err=>{
            setLoading(false)
            if(err.message === 'Firebase: Error (auth/invalid-credential).'){
              toast.error('Invalid email or password')
            }
            else{
              toast.error('Something went wrong')
            }
          })
    }

    return (
        <div>
          <ToastContainer/>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className='flex justify-center items-center gap-4'>
      <FcGoogle className='text-2xl' role='button' onClick={googleSignin}/>
      <FaGithub className='text-2xl' role='button' onClick={githubSignin}/>
        <GrFacebookOption className='text-2xl text-[#0866FF] bg-white' role='button' onClick={facebookSignin}/>
      </div>
      <form className="card-body" onSubmit={submit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name='password' className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;