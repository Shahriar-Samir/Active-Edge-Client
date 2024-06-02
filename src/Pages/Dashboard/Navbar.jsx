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
        <div className="drawer lg:drawer-open w-1/3">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle w-full" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden"><RxHamburgerMenu /></label>
  
  </div> 
  <div className="drawer-side relative w-full">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 fixed h-full bg-base-200 text-base-content gap-3 w-[250px] z-10">
      {
        navLinks()
      }
    </ul>
  
  </div>
</div>
    );
};

export default Navbar;

const Admin = ()=>{
    return(
      <>
       <li><NavLink to='/dashboard/profile'>All Newsletter Subscribers</NavLink></li>
      <li><NavLink to='/dashboard/activityLog'>All Trainers</NavLink></li>
      <li><NavLink to='/dashboard/recommendedClasses'>Applied Trainer</NavLink></li>
      <li><NavLink to='/dashboard/recommendedClasses'>Balance</NavLink></li>
      <li><NavLink to='/dashboard/recommendedClasses'>Add new Class</NavLink></li>
      </>
    )
}
const Trainer = ()=>{
    return(
      <>
       <li><NavLink to='/dashboard/profile'>Manage Slots</NavLink></li>
      <li><NavLink to='/dashboard/activityLog'>Add New Slot</NavLink></li>
      <li><NavLink to='/dashboard/recommendedClasses'>Add new Forum</NavLink></li>
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