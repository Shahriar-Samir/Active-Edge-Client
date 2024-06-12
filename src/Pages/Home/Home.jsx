import { ToastContainer } from "react-toastify";
import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";
import Team from "./Team";
import { Helmet } from "react-helmet-async";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Active Edge || Home</title>
            </Helmet>
            <ToastContainer/>
            <Banner/>
            <Featured/>
            <About/>
            <FeaturedClasses/>
            <Reviews/>
            <LatestPosts/>
            <Newsletter/>
            <Team/>
        </div>
    );
};

export default Home;