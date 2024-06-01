import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";
import Team from "./Team";



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
            <Team/>
        </div>
    );
};

export default Home;