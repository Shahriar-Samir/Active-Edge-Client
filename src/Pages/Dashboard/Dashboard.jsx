import { Outlet } from "react-router-dom";
// import Navbar from "./navbar";
// import Footer from "./Footer";


const Dashboard = () => {
    return (
        <div>
            <div className="flex">
                {/* <Navbar/> */}
                <div className="w-full">
                    <Outlet/>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    );
};

export default Dashboard;