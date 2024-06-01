import React from 'react';
import Heading from '../../Components/Heading';

const Team = () => {
    return (
        <div>
            <Heading title={'Our team'} details={'Full of members'}/>
            <div className='grid grid-cols-3'>
                    {[1,2,3].map((item,index)=>{
                            return <Trainer key={index} item={item}/>
                    })}
            </div>
        </div>
    );
};

export default Team;


const Trainer = ({item}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src="" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    );
};
