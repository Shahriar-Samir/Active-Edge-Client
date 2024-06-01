import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import Reviews from "./Reviews";



const Home = () => {
    return (
        <div>
            <Banner/>
            <Featured/>
            <About/>
            <FeaturedClasses/>
            <Reviews/>
        </div>
    );
};

export default Home;