import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllTrainers = () => {
    const okay = false
    const axiosSecure = useAxiosSecure()
    const {data} = useQuery({
        queryKey:["posts"],
        queryFn: ()=>
            axiosSecure.get('/trainers')
            .then(res=>{
                return res.data
            })
    })

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-bold text-center border-b pb-3'>All the Trainers</h1>
            {
                okay === true? 
                <div className='text-center text-lg mt-4'>
                    <h1>There are no trainers available</h1>
                </div> 
                : 
                <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                  {data?.map(item=>{
                    return (  <tr key={item._id} >
                     
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.photoURL} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.displayName}</div>
                            <div className="text-sm opacity-50">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Zemlak, Daniel and Leannon
                        <br/>
                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                      </td>
                      <td>Purple</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>)
                  })}
                  </tbody>
                </table>
              </div>
            }
        </div>
    );
};

export default AllTrainers;