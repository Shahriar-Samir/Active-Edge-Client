import React from 'react';

const Heading = ({title,details}) => {
    return (
        <div className='flex flex-col items-center'>
                <h1>{title}</h1>
                <p>{details}</p>
        </div>
    );
};

export default Heading;