import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import profileLoading from '../../public/animations/profileLoading.json'

const Navbar = () => {
  const {user,loading} = useContext(AuthContext)
  const {signout} = useContext(AuthContext)
  const logOut = ()=>{
      signout()
      .then(()=>{
          toast.success('You have logged out')
      })
      .catch(()=>{
          toast.error('Something went wrong')
      })
  }
    return (
       <div className='w-full bg-bgCommon'>
         <div className="navbar w-11/12 mx-auto px-0 max-w-[1200px] bg-transparent text-white">
  <div className="navbar-start">
    {
      loading? 
      <span className="loading loading-spinner loading-md me-5"></span> 
      :
      <div className="dropdown z-20">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black gap-3 text-lg">
      <li className='w-full'><NavLink to='/' className={({isActive})=> isActive? 'bg-black text-white px-2 rounded-md w-full text-lg' : 'px-2 rounded-md w-full text-lg'}>Home</NavLink></li>
        <li><NavLink to='/allTrainers' className={({isActive})=> isActive? 'bg-black text-white px-2 rounded-md text-lg' : 'px-2 rounded-md text-lg'}>All Trainers</NavLink></li>
        <li><NavLink to='/allClasses' className={({isActive})=> isActive? 'bg-black text-white px-2 rounded-md text-lg' : 'px-2 rounded-md text-lg'}>All Classes</NavLink></li>
        {user? <li><NavLink to='/dashboard' className={({isActive})=> isActive? 'bg-black text-white px-2 rounded-md text-lg' : 'px-2 rounded-md text-lg'}>Dashboard</NavLink></li> : ''}
        <li><NavLink to='/forum' className={({isActive})=> isActive? 'bg-black text-white px-2 rounded-md text-lg' : 'px-2 rounded-md text-lg'}>Community</NavLink></li>
        <li><button className='block text-center bg-slate-600 text-white py-3' onClick={logOut}>Logout</button></li>
      </ul>
    </div>
    }

    <Link to='/' className=" flex flex-row-reverse md:flex-row items-center gap-2 md:gap-3"><span className='text-xl md:text-2xl  xl:text-4xl font-bold w-[150px] md:w-fit'>Active Edge</span> <img src='/Icons/logo2.png' className='w-[35px] h-[35px] object-cover lg:w-[40px] lg:h-[40px]'/></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    {loading? 
    <span className="loading loading-spinner loading-md"></span>
    :
    <ul className="flex items-center gap-4 font-semibold text-base">
         <li><NavLink to='/' className={({isActive})=> isActive? 'bg-white text-black px-2 rounded-md' : 'px-2 rounded-md'}>Home</NavLink></li>
        <li><NavLink to='/allTrainers' className={({isActive})=> isActive? 'bg-white text-black px-2 rounded-md' : 'px-2 rounded-md'}>All Trainers</NavLink></li>
        <li><NavLink to='/allClasses' className={({isActive})=> isActive? 'bg-white text-black px-2 rounded-md' : 'px-2 rounded-md'}>All Classes</NavLink></li>
        {user? <li><NavLink to='/dashboard' className={({isActive})=> isActive? 'bg-white text-black px-2 rounded-md' : 'px-2 rounded-md'}>Dashboard</NavLink></li> : ''}
        <li><NavLink to='/forum' className={({isActive})=> isActive? 'bg-white text-black px-2 rounded-md' : 'px-2 rounded-md'}>Community</NavLink></li>
    </ul>}
  </div>
  <div className="navbar-end">
    {loading? <Lottie animationData={profileLoading} loop={true} className='h-[50px] w-[50px]'/>  : user? <Profile/> : <Link to='/login' className='btn'>Login</Link>}
  </div>
</div>
       </div>
    );
};

export default Navbar;


const Profile = ()=>{
  const {signout} = useContext(AuthContext)
  const logOut = ()=>{
      signout()
      .then(()=>{
          toast.success('You have logged out')
      })
      .catch(()=>{
          toast.error('Something went wrong')
      })
  }

    const {user} = useContext(AuthContext)
    const {photoURL} = user
    return (
      <div className='flex items-center gap-5'>
        <img src={photoURL} className='w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover'/>
        <button className='btn hidden md:inline' onClick={logOut}>Logout</button>
      </div>
    )
}