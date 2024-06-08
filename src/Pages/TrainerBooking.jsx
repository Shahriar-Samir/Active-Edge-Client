import React from 'react';
import { Link, useParams } from 'react-router-dom';

const TrainerBooking = () => {
    const {slotId} = useParams() 
    return (
        <div>
            {slotId}
            <div className='grid grid-cols-3'>
                    <Package type='basic' slotId={slotId}/>
                    <Package type='standard' slotId={slotId}/>
                    <Package type='premium' slotId={slotId}/>
            </div>
        </div>
    );
};

export default TrainerBooking;

const Package = ({type, slotId})=>{
    return <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{type}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
      <Link to={`/payment?slotId=${slotId}&type=${type}`}><button className="btn btn-primary">Buy Now</button></Link>
      </div>
    </div>
  </div>
}