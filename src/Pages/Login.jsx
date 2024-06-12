import { useContext } from 'react';
import {toast,ToastContainer} from 'react-toastify'
import { AuthContext } from '../Providers/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const axiosPublic = useAxiosPublic()
    const {signin,setLoading,googleAuth,facebookAuth,githubAuth} = useContext(AuthContext)
    const navigate = useNavigate()


    const googleSignin = ()=>{
        googleAuth()
        .then(res=>{
          const {uid,email,displayName,phoneNumber,photoURL} = res.user
          const userData = {uid, email, displayName, photoURL, phoneNumber, role:'member'}
          axiosPublic.get(`/userRole/${uid}`)
          .then(res=>{
              if(res.data){
                setLoading(false)
                toast.success('You have logged in successfully')
              }
              else{
                axiosPublic.post('/addUser',userData)
                .then(()=>{
                  setLoading(false)
                  toast.success('You have logged in successfully')
                })
              }
          })
        })
        .catch(()=>{
          setLoading(false)
            toast.error('Something went wrong')
        })
    }
    const githubSignin = ()=>{
        githubAuth()
        .then(res=>{
          const {uid,email,displayName,phoneNumber,photoURL} = res.user
          const userData = {uid, email, displayName, photoURL, phoneNumber, role:'member'}
          axiosPublic.get(`/userRole/${uid}`)
          .then(res=>{
              if(res.data){
                setLoading(false)
                toast.success('You have logged in successfully')
              }
              else{
                axiosPublic.post('/addUser',userData)
                .then(()=>{
                  setLoading(false)
                  toast.success('You have logged in successfully')
                })
              }
          })
        })
        .catch(()=>{
          setLoading(false)
            toast.error('Something went wrong')
        })
    }
    const facebookSignin = ()=>{
        facebookAuth()
        .then(res=>{
          const {uid,email,displayName,phoneNumber,photoURL} = res.user
          const userData = {uid, email, displayName, photoURL, phoneNumber, role:'member'}
          axiosPublic.get(`/userRole/${uid}`)
          .then(res=>{
              if(res.data){
                setLoading(false)
                toast.success('You have logged in successfully')
              }
              else{
                axiosPublic.post('/addUser',userData)
                .then(()=>{
                  setLoading(false)
                  toast.success('You have logged in successfully')
                })
              }
          })
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
              setLoading(false)
              toast.error('Invalid email or password')
            }
            else{
              setLoading(false)
              toast.error('Something went wrong')
            }
          })
    }

    return (
        <div className=''>
            <Helmet>
                <title>Active Edge | Login</title>
            </Helmet>
          <ToastContainer/>
            <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse md:gap-20 mt-20 md:mt-0">
    <div className="text-center lg:text-left md:w-1/2">
      <h1 className="text-5xl font-bold">Welcome Back to ActiveEdge</h1>
      <p className="py-6">Enter your credentials to unlock your personalized fitness dashboard, schedule training sessions, and stay on top of your fitness goals. We're excited to have you back!</p>
    </div>
    <div className="card shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
    
      <form className="card-body w-full"  onSubmit={submit}>
        <h1 className='text-2xl text-center'>Login With</h1>
        <div className=' mt-7 flex justify-center items-center gap-2 text-sm flex-wrap'>
      <div onClick={googleSignin} role='button' className='flex justify-center bg-black text-white p-2 rounded-xl gap-2'>
        <h1>Google</h1>
        <FcGoogle className='text-2xl'  />
      </div>
      <div role='button' onClick={githubSignin}className='flex justify-center bg-black text-white p-2 rounded-xl gap-2'>
        <h1>Github</h1>
        <FaGithub className='text-2xl' />
      </div>
      <div role='button' onClick={facebookSignin} className='flex justify-center bg-black text-white p-2 rounded-xl gap-2'>
        <h1>Facebook</h1>
        <GrFacebookOption className='text-2xl text-[#0866FF] bg-white'/>
      </div>
      </div>
      <div className="divider font-bold">Or</div>
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
        <p className='text-sm mt-2'>Don't have a account ? <Link to='/signup' className='font-semibold hover:underline'>Create an account</Link></p>
        <div className="form-control mt-2">
          <button className="btn bg-bgCommon text-white  hover:bg-bgHover">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;