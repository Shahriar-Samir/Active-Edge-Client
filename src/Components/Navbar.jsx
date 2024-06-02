import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
  const {user} = useContext(AuthContext)
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allTrainers'>All Trainers</NavLink></li>
        <li><NavLink to='/allClasses'>All Classes</NavLink></li>
        {user? <li><NavLink to='/dashboard'>Dashboard</NavLink></li> : ''}
        <li><NavLink to='/forum'>Community</NavLink></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
         <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allTrainers'>All Trainers</NavLink></li>
        <li><NavLink to='/allClasses'>All Classes</NavLink></li>
        {user? <li><NavLink to='/dashboard'>Dashboard</NavLink></li> : ''}
        <li><NavLink to='/forum'>Community</NavLink></li>
    </ul>
  </div>
  <div className="navbar-end">
    {user? <Profile/> : <Link to='/login' className='btn'>Login</Link>}
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
        <img src={photoURL} className='w-[50px] h-[50px] rounded-full object-cover'/>
        <button className='btn' onClick={logOut}>Logout</button>
      </div>
    )
}