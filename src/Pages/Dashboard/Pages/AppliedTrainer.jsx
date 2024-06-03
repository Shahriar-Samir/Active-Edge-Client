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
          <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div>
    <div className="w-full flex gap-5">
        <img className="w-[150px] h-[150px]"/>
        <div>
        <h1>Full Name : Shahriar Samir</h1>
        <h1>Email : Shahriar Samir</h1>
        <h1>Age: 21 years</h1>
        <h1>Skills: 
          <span> Hoem,</span>
          <span> Hoem,</span>
          <span> Hoem,</span>
        </h1>
        <h1>Available Days: 
          <span> Sun,</span>
          <span> Mon,</span>
          <span> Tues,</span>
        </h1>
        <h1>Available Time: <span> 20am-20pm</span>
        </h1>
        </div>
    </div>
    <div className="flex gap-5 mt-4 justify-end">
        <button className="btn">Confirm</button>
        <button className="btn">Reject</button>
    </div>
    </div>
  </div>
</dialog>
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
                                <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}><FaEye/></button>
                            </div>
                          </div>
                        })}
                </div>
              }
        </div>
    );
};

export default AppliedTrainer;