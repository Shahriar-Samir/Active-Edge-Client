import { FaEye } from "react-icons/fa6";

const AppliedTrainer = () => {
    const okay = false
    return (
        <div className='w-full'>
              <h1 className='text-2xl font-bold text-center border-b pb-3'>All the applications</h1>
              {
                okay?
                <div>

                </div>
                :
                <div className='grid grid-cols-2 gap-5 px-10 mt-5'>
                        {[1,2,3,4,5,].map(()=>{
                            return <div className="flex bg-base-100 shadow-xl gap-5">
                                <img src='' className='w-[50px] h-[50px]'/>
                              <p>If a dog chews shoes whose shoes does he choose?</p>
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