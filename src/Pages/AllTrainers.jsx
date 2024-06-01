import React from 'react';

const AllTrainers = () => {
    return (
        <div className='grid grid-cols-4 gap-4 w-11/12 max-w-[1200px] mx-auto'>
            {[1,2,3,4,5].map(item=>{
                return <Trainer/>
            })}  
        </div>
    );
};

export default AllTrainers;

const Trainer = ()=>{
    return(
        <div className="card bg-base-100 shadow-xl">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    )
}