import React from 'react';

const Heading = ({title,details}) => {
    return (
        <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-bold text-center'>{title}</h1>
                <p className='mt-4 text-xl text-center'>{details}</p>
        </div>
    );
};

export default Heading;