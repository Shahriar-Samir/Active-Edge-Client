import React from 'react';

const Featured = () => {
    
     const features =[
          {
            "title": "Real-Time Progress Tracking",
            "description": "Monitor your fitness journey with up-to-date statistics and analytics.",
            "icon": "progress_icon.png"
          },
          {
            "title": "Personalized Goal Setting",
            "description": "Set custom fitness goals and receive tailored recommendations.",
            "icon": "goal_icon.png"
          },
          {
            "title": "Community Engagement",
            "description": "Connect with fellow fitness enthusiasts, share progress, and stay motivated.",
            "icon": "community_icon.png"
          },
          {
            "title": "Workout Plans",
            "description": "Access a variety of workout plans designed by fitness experts.",
            "icon": "workout_icon.png"
          },
          {
            "title": "Nutrition Tracking",
            "description": "Keep track of your dietary habits and receive nutrition advice.",
            "icon": "nutrition_icon.png"
          },
          {
            "title": "Progress Reports",
            "description": "Get detailed reports on your fitness progress over time.",
            "icon": "reports_icon.png"
          },
          {
            "title": "Sync with Wearables",
            "description": "Integrate with popular fitness wearables for seamless tracking.",
            "icon": "wearables_icon.png"
          },
          {
            "title": "Customizable Dashboard",
            "description": "Personalize your dashboard to focus on what matters most to you.",
            "icon": "dashboard_icon.png"
          }
        ]

      
    return (
        
        <div className='grid grid-cols-4'>
            {features.map((item,index)=>{
                return <Card key={index} item={item}/>
            })}
        </div>
    );
};

export default Featured;


const Card = ({item})=>{
    const {title,description,icon} = item
    return <div className='flex justify-between items-center w-full'>
        <img src={icon} className='w-[50px] h-full'/>
        <div className='flex flex-col items-start'>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
}