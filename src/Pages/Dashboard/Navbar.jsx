import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {
  const {user} = useContext(AuthContext)
  const role = user?.role

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
      <div className='w-1/4 h-[100vh]  bg-bgCommon text-white fixed'>
        <div className='p-5'>
        <ul className="pt-5 flex flex-col gap-5"> 
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