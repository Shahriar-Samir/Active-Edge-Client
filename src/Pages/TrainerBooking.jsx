import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TrainerBooking = () => {
    const {slotId} = useParams() 
    return (
        <div>
            {slotId}
            <div className='grid grid-cols-3'>
                    <Package type='basic'/>
                    <Package type='standard'/>
                    <Package type='premium'/>
            </div>
        </div>
    );
};

export default TrainerBooking;

const Package = ({type})=>{
    return <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{type}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
      <Link to={`/payment/${type}`}><button className="btn btn-primary">Buy Now</button></Link>
      </div>
    </div>
  </div>
}