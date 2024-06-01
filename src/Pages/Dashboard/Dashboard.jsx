import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Dashboard = () => {
    return (
        <div className="w-full">
            <div className="w-full flex">
                <Navbar/>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;