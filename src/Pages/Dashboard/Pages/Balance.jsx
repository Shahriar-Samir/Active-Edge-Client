import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';


const Balance = () => {
  const {user} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const {data:payments} = useQuery({
      queryKey:["payments"],
      queryFn: ()=>
          axiosSecure.get(`/payments`)
          .then(res=>{
              return res.data
          }),
      enabled: !!user
  })
  const {data:paidMembers} = useQuery({
      queryKey:["paidMember"],
      queryFn: ()=>
          axiosSecure.get(`/allPaidMember`)
          .then(res=>{
              return res.data
          }),
      enabled: !!user
  })

  const {data:subscribers} = useQuery({
      queryKey:["subscribers"],
      queryFn: ()=>
          axiosSecure.get(`/subscribers`)
          .then(res=>{
              return res.data
          }),
      enabled: !!user
  })
  const {data:totalBalance} = useQuery({
      queryKey:["totalBalance"],
      queryFn: ()=>
          axiosSecure.get(`/totalBalance`)
          .then(res=>{
              return res.data
          }),
      enabled: !!user
  })

  
    return (
        <div>
            <h1 className='text-center mt-5 text-4xl font-bold'>Admin's Balance</h1>
                <h1 className='text-2xl font-bold text-center mt-3'>Balance {totalBalance?.totalBalance}$</h1>
            <div className='mt-10'>
                    <h1 className='text-center text-2xl '>Last six transactions</h1>
                   <div className='flex items-center '>
                   <div className='grid grid-cols-1 gap-5 mt-4 w-1/2'>
                   {payments?.map(item=>{
                        return <div key={item} className="card card-side bg-base-100 shadow-xl w-10/12 mx-auto gap-4">
                        <div className="">
                          <h2 className="card-title">{item.slotName}</h2>
                          <p>Txd Id: {item.transactionId}</p>
                        </div>
                      </div>
                    })}
                   </div>
                    <div className='w-1/2'>
                    <PieChart
  series={[
    {
      data: [
        { id: 0, value: subscribers?.length, label: 'Subscribers' },
        { id: 1, value: paidMembers?.length, label: 'Paid members' },
      ],
      innerRadius: 30,
      outerRadius: 90,
      paddingAngle: 2,
    },
  ]}
  width={450}
  height={200}
/>
                    </div>
                   </div>
            </div>
            <div className='flex justify-center items-center mt-10'>
            </div>
        </div>
    );
};

export default Balance;