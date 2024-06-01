import React from 'react';

const AllClasses = () => {
    return (
        <div className='mx-auto w-11/12 max-w-[1200px]'>
            <div className='grid grid-cols-2 gap-10'>
                {[1,2,3,4,5,6].map(item=>{
                    return <Class/>
                })}
            </div>
        </div>
    );
};

export default AllClasses;

const Class = ()=>{
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    )
}