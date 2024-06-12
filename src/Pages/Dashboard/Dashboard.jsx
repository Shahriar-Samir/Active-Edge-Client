import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";


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
      <HelmetProvider>
        <div className="w-full relative">
   
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/4">
                <Navbar/>
                </div>
                <div className="lg:w-3/4">
                <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
        </HelmetProvider>
    );
};

export default Dashboard;