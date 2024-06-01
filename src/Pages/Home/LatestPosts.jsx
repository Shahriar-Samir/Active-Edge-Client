import { Link } from "react-router-dom";
import Heading from "../../Components/Heading";


const LatestPosts = () => {
    return (
        <div>
            <Heading title={'Latest Posts'} details={'This is all posts'}/>
            <div className="grid grid-cols-3 grid-rows-3 h-[70vh]">
                {[1,2,3,4,5].map((item,index)=>{
                   if(index===0){
                    return <div key={index} className="row-span-3 col-span-1 p-4" >
                            <div className="flex items-center gap-4">
                            <img src="" className="w-[50px] h-[50px]"/>
                            <h1>Masud Rana</h1>
                            </div>
                            <h1 className="text-3xl font-semibold">5 Tips to Kickstart Your Fitness Journey</h1>
                            <p>Discover essential tips and strategies to begin your fitness journey and stay motivated. These practical steps will help you set achievable goals and maintain a healthy routine.</p>
                            <Link><button>Read More</button></Link>
                    </div>
                   }
                   return <div key={index} className="col-span-1">
      <div className="flex items-center gap-4">
                            <img src="" className="w-[25px] h-[25px]"/>
                            <h1>Masud Rana</h1>
                            </div>
                            <h1 className="font-semibold">5 Tips to Kickstart Your Fitness Journey</h1>
                            <p>Discover essential tips and strategies to begin your fitness journey and stay motivated. These practical steps will help you set achievable goals and maintain a healthy routine.</p>
                            <Link><button>Read More</button></Link>
                   </div>
                })}
            </div>
        </div>
    );
};

export default LatestPosts;