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
      <div className='w-1/4 h-[100vh]  bg-gray-200 fixed'>
        <div className='p-5'>
        <ul className="menu flex flex-col gap-5"> 
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
       <li><NavLink to='/dashboard/newsletterSubscribers'>All Newsletter Subscribers</NavLink></li>
      <li><NavLink to='/dashboard/allTrainers'>All Trainers</NavLink></li>
      <li><NavLink to='/dashboard/appliedTrainers'>Applied Trainer</NavLink></li>
      <li><NavLink to='/dashboard/balance'>Balance</NavLink></li>
      <li><NavLink to='/dashboard/addNewClass'>Add new Class</NavLink></li>
      </>
    )
}
const Trainer = ()=>{
    return(
      <>
       <li><NavLink to='/dashboard/manageSlots'>Manage Slots</NavLink></li>
      <li><NavLink to='/dashboard/addNewSlot'>Add New Slot</NavLink></li>
      <li><NavLink to='/dashboard/addNewForum'>Add new Forum</NavLink></li>
      </>
    )
}
const Member = ()=>{
    return(
      <>
       <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
      <li><NavLink to='/dashboard/activityLog'>Activity Log</NavLink></li>
      <li><NavLink to='/dashboard/recommendedClasses'>Recommended Classes</NavLink></li>
      </>
    )
}