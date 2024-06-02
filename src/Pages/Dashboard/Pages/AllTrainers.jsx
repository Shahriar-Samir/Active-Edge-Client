import React from 'react';

const AllTrainers = () => {
    const okay = false
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
                    <tr>
                     
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Hart Hagerty</div>
                            <div className="text-sm opacity-50">United States</div>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            }
        </div>
    );
};

export default AllTrainers;