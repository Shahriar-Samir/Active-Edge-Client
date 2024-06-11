import { Link } from "react-router-dom";
import Heading from "../../Components/Heading";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";


const LatestPosts = () => {
    const axiosPublic = useAxiosPublic()
    const {data:posts,isFetching} = useQuery({
        queryKey:["posts"],
        initialData: [],
        queryFn: ()=>
            axiosPublic.get('/latestPosts')
            .then(res=>{
                console.log(res.data)
                return res.data
            })
    })
    if(isFetching){
        return <Loading/>
    }
    return (
        <div className="w-11/12 mx-auto max-w-[1200px] mt-28">
            <Heading title={'Latest Posts'} details={'Six latest forum posts'}/>
            <div className="grid grid-cols-2 gap-7 mt-10">
                {posts?.map((item,index)=>{
                   return <div key={index} className="col-span-1">
      <div className="flex items-center gap-4">
                            <img src={item.photoURL} className="w-[60px] h-[60px] rounded-full object-cover"/>
                            <div className="w-full">
                            <h1 className="font-bold text-xl ">{item.title}</h1>
                            <div className="flex gap-2 items-center justify-between w-full">
                            <h1 className="font-bold"><span className="text-sm font-medium">by</span> {item.displayName} ({item.role})</h1>
                            <h1>{item.date}</h1>
                            </div>
                            </div>
                            </div>
                            <p className="w-full mt-3">{item.texts.slice(0,200)}...</p>
                            <Link to={`/forum/post/${item._id}`}><button className="btn mt-3 bg-bgCommon text-white">Read More</button></Link>
                   </div>
                })}
            </div>
        </div>
    );
};

export default LatestPosts;