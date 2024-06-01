import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";



const Home = () => {
    return (
        <div>
            <Banner/>
            <Featured/>
            <About/>
            <FeaturedClasses/>
            <Reviews/>
            <LatestPosts/>
            <Newsletter/>
        </div>
    );
};

export default Home;