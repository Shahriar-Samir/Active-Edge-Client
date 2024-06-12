import React, { useContext } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { useMediaQuery } from '@mui/material';

const Navbar = () => {
  const {user} = useContext(AuthContext)
  const role = user?.role
  const min = useMediaQuery('(min-width:500px)');

  const navLinks = ()=>{
      if(role==='admin'){
        return <Admin/>
      }
      if(role==='trainer'){
        return <Trainer/>
      }
      if(role==='member'){
        return <Member/>
      }
  }

    return (
      <div className=' lg:w-1/4 lg:h-[100vh]  bg-bgCommon text-white lg:fixed'>
        <div className='p-5 flex items-center justify-between lg:flex-col'>
        <div className="drawer lg:hidden z-30">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content lg:hidden">
 
    <label htmlFor="my-drawer" className="drawer-button">   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className={`menu p-4 w-${min? '1/2' : '10/12'} min-h-full bg-bgCommon text-white`}>
      {/* inside */}
{/* inside */}
{/* inside */}
    <div className=' bg-bgCommon text-white'>
        <div className='p-5 flex items-center justify-between '>
        <ul className="mt-10 flex flex-col gap-5 w-full"> 
          <NavLink to='/'  className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Home</NavLink>
        {navLinks()}
    </ul>
      </div>
      </div>
{/* inside */}
{/* inside */}
{/* inside */}
      
    </ul>
  </div>
</div>
      <h1 className='text-2xl font-bold lg:text-3xl'>Dashboard</h1>
        <ul className="mt-10 hidden lg:flex flex-col gap-5 w-full"> 
          <NavLink to='/'  className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Home</NavLink>
        {navLinks()}
    </ul>
      </div>
      </div>

    );
};

export default Navbar;

const Admin = ()=>{
    return(
      <>
       <NavLink to='/dashboard/newsletterSubscribers' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>All Newsletter Subscribers</NavLink>
      <NavLink to='/dashboard/allTrainers' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>All Trainers</NavLink>
      <NavLink to='/dashboard/appliedTrainers' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Applied Trainer</NavLink>
      <NavLink to='/dashboard/balance' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Balance</NavLink>
      <NavLink to='/dashboard/addNewClass' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Add new Class</NavLink>
      <NavLink to='/dashboard/addNewForum' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Add new Forum</NavLink>
      </>
    )
}
const Trainer = ()=>{
    return(
      <>
       <NavLink to='/dashboard/manageSlots' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Manage Slots</NavLink>
      <NavLink to='/dashboard/addNewSlot' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Add New Slot</NavLink>
      <NavLink to='/dashboard/addNewForum' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Add new Forum</NavLink>
      </>
    )
}
const Member = ()=>{
    return(
      <>
<NavLink to='/dashboard/profile'  className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Profile</NavLink>
<NavLink to='/dashboard/activityLog'  className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Activity Log</NavLink>
<NavLink to='/dashboard/recommendedClasses' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Recommended Classes</NavLink>
  <NavLink to='/dashboard/addfeedback' className={({isActive})=> isActive? 'bg-white text-black rounded-md w-full text-center py-2' : 'rounded-md w-full text-center p-2'}>Add Feedback</NavLink>
      </>
    )
}

