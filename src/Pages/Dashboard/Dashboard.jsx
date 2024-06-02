import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Dashboard = () => {
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