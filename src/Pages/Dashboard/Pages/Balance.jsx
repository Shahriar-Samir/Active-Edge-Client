import { PieChart } from '@mui/x-charts/PieChart';


const Balance = () => {
    return (
        <div>
            <h1 className='text-center mt-5 text-4xl font-bold'>Admin's Balance</h1>
                <h1 className='text-2xl font-bold text-center mt-3'>Balance {0}$</h1>
            <div className='mt-10'>
                    <h1 className='text-center text-2xl '>Last six transactions</h1>
                   <div className='flex items-center '>
                   <div className='grid grid-cols-1 gap-5 mt-4 w-1/2'>
                   {[1,2,3,4,5].map(item=>{
                        return <div key={item} className="card card-side bg-base-100 shadow-xl w-10/12 mx-auto gap-4">
                        <div className="">
                          <h2 className="card-title">New movie is released!</h2>
                          <p>Click the button to watch on Jetflix app.</p>
                        </div>
                      </div>
                    })}
                   </div>
                    <div className='w-1/2'>
                    <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'Subscribers' },
        { id: 1, value: 15, label: 'Paid members' },
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