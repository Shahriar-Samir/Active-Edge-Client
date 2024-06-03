import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AppliedTrainer = () => {
    const okay = false
    const axiosSecure = useAxiosSecure()

    const {data} = useQuery({
      queryKey: ['featuredClasses'],
      queryFn: ()=>
          axiosSecure.get('/applications')
          .then(res=>{
              return  res.data
          })
  })

  console.log(data)
    return (
        <div className='w-full'>
              <h1 className='text-2xl font-bold text-center border-b pb-3'>All the applications</h1>
              {
                okay?
                <div>

                </div>
                :
                <div className='grid grid-cols-2 gap-5 px-10 mt-5'>
                        {data?.map((item)=>{
                            return <div key={item._id} className="flex justify-between items-center bg-base-100 shadow-xl gap-5 p-4">
                                <img src={item.image} className='w-[50px] h-[50px]'/>
                              <div>
                              <p><span className="font-bold">Full name:</span> {item.fullName}</p>
                              <p><span className="font-bold">Email:</span> {item.email}</p>
                              </div>
                              <div className="card-actions justify-end">
                                <button className="btn"><FaEye/></button>
                            </div>
                          </div>
                        })}
                </div>
              }
        </div>
    );
};

export default AppliedTrainer;