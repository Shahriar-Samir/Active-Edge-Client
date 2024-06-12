import { useContext } from 'react';
import {toast,ToastContainer} from 'react-toastify'
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';
import { Link } from 'react-router-dom';


const Register = () => {
    const {signup,setLoading,updateUser,googleAuth,facebookAuth,githubAuth} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

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
      const name= form.name.value
      const email= form.email.value
      const photoUrl = form.photoUrl.value
      const password = form.password.value
      const role = 'member'
      if(password.length < 6 || /[A-Z]/.test(password) === false || /[a-z]/.test(password) === false){
        toast.error('Password must have an uppercase and lowercase letter with at least 6 characters')
       }
       else{
          signup(email,password)
          .then(res=>{
            updateUser({photoURL:photoUrl,displayName:name})
            .then(()=>{
              const {uid,email,displayName,phoneNumber,photoURL} = res.user
              const userData = {uid, email, displayName, photoURL, phoneNumber, role}
              axiosPublic.post('/addUser',userData)
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
        <div className='mt-16'>
          <ToastContainer/>
          <Helmet>
                <title>Active Edge | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen w-full">
  <div className="hero-content flex-col lg:flex-row-reverse w-full">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={submit}>
        <h1 className='text-2xl font-bold text-center'>Create a new account</h1>
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
        </div>
        <div className=' mt-5 flex justify-center items-center gap-2 text-sm flex-wrap'>
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
        <div className="form-control mt-0">
          <button className="btn bg-bgCommon text-white hover:bg-bgHover">Create an account</button>
        </div>
        <p className='text-center mt-2 text-sm'>Already have an account? <Link className='font-bold hover:underline' to='/login'>Login</Link></p>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;