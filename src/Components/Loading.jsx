import React from 'react';
import Lottie from "lottie-react";
import loading from "../../public/animations/dumble.json";

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='flex items-center flex-col-reverse relative'>
            <h1 className='text-3xl font-bold text-blue-400 absolute top-0'>Loading</h1>
            <Lottie animationData={loading} className='w-[250px] p-0' loop={true}/>
            </div>
        </div>
    );
};

export default Loading;