import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
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
        </div>
    );
};

export default Home;