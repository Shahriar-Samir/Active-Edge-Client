import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden"><RxHamburgerMenu /></label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><NavLink to='/dashboard/profile'>Profile</NavLink></li>
      <li><NavLink to='/dashboard/activityLog'>Activity Log</NavLink></li>
      <li><NavLink to='/dashboard/recommendedClasses'>Recommended Classes</NavLink></li>
    </ul>
  
  </div>
</div>
    );
};

export default Navbar;