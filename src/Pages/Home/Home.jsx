import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";



const Home = () => {
    return (
        <div>
            <Banner/>
            <Featured/>
            <About/>
            <FeaturedClasses/>
        </div>
    );
};

export default Home;