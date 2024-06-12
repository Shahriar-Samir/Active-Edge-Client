import React from 'react';
import Heading from '../../Components/Heading';

const Featured = () => {
    
     const features =[
          {
            "title": "Real-Time Progress Tracking",
            "description": "Monitor your fitness journey with up-to-date statistics and analytics.",
            "icon": "/featured/5.png"
          },
          {
            "title": "Expert Personal Trainer",
            "description": "Receive guidance and support from certified trainers.",
            "icon": "/featured/9.png"
          },
          {
            "title": "Recommendations",
            "description": "Receive tailored recommendations.",
            "icon": "/featured/3.png"
          },
          {
            "title": "Community Engagement",
            "description": "Connect with fellow fitness enthusiasts, share progress, and stay motivated.",
            "icon": "/featured/1.png"
          },
          {
            "title": "Workout Classes",
            "description": "Access a variety of workout classes designed by fitness experts.",
            "icon": "/featured/8.png"
          },
          {
            "title": "Become A Trainer",
            "description": "Join our team of experts and help others achieve their fitness goals.",
            "icon": "/featured/4.png"
          },
          {
            "title": "Post Voting System",
            "description": "Engage with the community by upvoting or downvoting posts.",
            "icon": "/featured/6.png"
          },
          {
            "title": "Customizable Dashboard",
            "description": "Personalize your dashboard to focus on what matters most to you.",
            "icon": "/featured/2.png"
          },

        ]

      
    return (
        
        <div className='w-11/12 max-w-[1200px] mx-auto mt-28'>
          <Heading title={'Our Features'} details={'Here are the key features'}/>
          <div className='grid grid-cols-1 max-w-[330px] md:max-w-[650px] lg:max-w-full mx-auto md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12'>
            {features.map((item,index)=>{
                return <Card key={index} item={item}/>
            })}
        </div>
        </div>
    );
};

export default Featured;


const Card = ({item})=>{
    const {title,description,icon} = item
    return <div className='flex justify-between w-full gap-2'>
        <img src={icon} className='w-[80px] h-[80px] object-cover'/>
        <div className='flex flex-col items-start'>
            <h1 className='font-bold text-lg'>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
}