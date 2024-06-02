import React from 'react';

const AllNewsletterSubs = () => {
    const okay = false
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-bold text-center border-b pb-3'>All the new letter subscribers</h1>
            {
                okay === true? 
                <div className='text-center text-lg mt-4'>
                    <h1>There are no newsletters</h1>
                </div> 
                : 
                <div className="overflow-x-auto w-1/2 mx-auto mt-4">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>Shahriar Samir</th>
                      <th>shabusiness035@gmail.com</th>
                    </tr>
                    {/* row 2 */}
                    <tr>
                    <th>Shahriar Samir</th>
                      <th>shabusiness035@gmail.com</th>
                    </tr>
                    {/* row 3 */}
                    <tr>
                    <th>Shahriar Samir</th>
                      <th>shabusiness035@gmail.com</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
        </div>
    );
};

export default AllNewsletterSubs;