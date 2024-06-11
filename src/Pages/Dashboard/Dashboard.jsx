import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') {
          if (user?.role === 'admin') {
            navigate('/dashboard/newsletterSubscribers', { replace: true });
          } 
          if (user?.role === 'trainer') {
            navigate('/dashboard/manageSlots', { replace: true });
          }
          if (user?.role === 'member') {
            navigate('/dashboard/profile', { replace: true });
          }
        }
      }, [location, navigate, user]);

    return (
        <div className="w-full relative">
            <div className="flex">
                <div className="w-1/4">
                <Navbar/>
                </div>
                <div className="w-3/4">
                <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;