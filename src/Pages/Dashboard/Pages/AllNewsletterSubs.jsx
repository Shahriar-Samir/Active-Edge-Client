import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const AllNewsletterSubs = () => {
  const axiosSecure = useAxiosSecure()

  const {data} = useQuery({
      queryKey: ['featuredClasses'],
      queryFn: ()=>
          axiosSecure.get('/subscribers')
          .then(res=>{
              return  res.data
          })
  })

    return (
        <div className='w-full'>
            <Helmet>
                <title>Active Edge | All Newsletter Subscribers</title>
            </Helmet>
            <h1 className='text-2xl font-bold text-center border-b pb-3'>All the new letter subscribers</h1>
            {
                data?.length < 1? 
                <div className='text-center text-lg mt-4'>
                    <h1>There are no newsletters</h1>
                </div> 
                : 
                <div className="overflow-x-auto w-1/2 mx-auto mt-4">
                <table className="table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        data?.map(item=>{
                          const {name,email,_id} = item
                          return (
                            <tr key={_id}>
                      <th>{name}</th>
                      <th>{email}</th>
                    </tr> 
                          )
                        })
                    }
                  </tbody>
                </table>
              </div>
            }
        </div>
    );
};

export default AllNewsletterSubs;