import React from 'react';
import Heading from '../../Components/Heading';

const About = () => {
    return (
       <div className='mt-28'>
        <h1 className='text-center text-5xl font-bold'>Who Are We?</h1>
<div className='flex justify-between w-11/12 mx-auto max-w-[1200px] items-center gap-10 h-full mt-10'>
         <div className='w-1/2'>
           <p className='text-xl'>
           Introduction Paragraph:
At the forefront of revolutionizing the fitness industry, our company is dedicated to providing innovative solutions that empower individuals to lead healthier, more active lifestyles. Combining cutting-edge technology with a passion for fitness, we create a community-driven platform that inspires and supports our users.
<br></br>
Mission Statement:
Our mission is to transform fitness and wellness through innovative technology and a supportive community.
<br></br>
Company History:
Founded in 2015, we’ve grown from a small startup to an industry leader, launching our first fitness tracker app in 2024.
           </p>
<br></br>
        </div>
        <div className='w-1/2'>
            <img src='/photos/about.jpg'/>
        </div>
       </div>
       </div>
    );
};

export default About;