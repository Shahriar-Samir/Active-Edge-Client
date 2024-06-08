import Lottie from 'lottie-react';
import React from 'react';
import error from "../../public/animations/error.json";
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex justify-center items-center flex-col h-[100vh]'>
            <div className='flex flex-col-reverse items-center'>
            <Lottie animationData={error} loop={true} />
            <h1 className='text-2xl font-bold'>Page Not Found</h1>
            </div>
            <Link to='/'><button className='btn'>Go back to home</button></Link>
        </div>
    );
};

export default ErrorPage;