import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import { Helmet } from 'react-helmet-async';

const TrainerApplication = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const daysOptions = [
        { value: 'Sun', label: 'Sunday' },
        { value: 'Mon', label: 'Monday' },
        { value: 'Tue', label: 'Tuesday' },
        { value: 'Wed', label: 'Wednesday' },
        { value: 'Thu', label: 'Thursday' },
        { value: 'Fri', label: 'Friday' },
        { value: 'Sat', label: 'Saturday' },
      ];
    const timeOptions =  [
        { "value": "5:00 AM - 7:00 AM", "label": "5:00 AM - 7:00 AM" },
        { "value": "7:00 AM - 9:00 AM", "label": "7:00 AM - 9:00 AM" },
        { "value": "9:00 AM - 11:00 AM", "label": "9:00 AM - 11:00 AM" },
        { "value": "11:00 AM - 1:00 PM", "label": "11:00 AM - 1:00 PM" },
        { "value": "1:00 PM - 3:00 PM", "label": "1:00 PM - 3:00 PM" },
        { "value": "3:00 PM - 5:00 PM", "label": "3:00 PM - 5:00 PM" },
        { "value": "5:00 PM - 7:00 PM", "label": "5:00 PM - 7:00 PM" },
        { "value": "7:00 PM - 9:00 PM", "label": "7:00 PM - 9:00 PM" },
        { "value": "9:00 PM - 11:00 PM", "label": "9:00 PM - 11:00 PM" }
      ]
    const mediaOptions =  [
        { "value": "facebook", "label": "Facebook" },
        { "value": "twitter", "label": "Twitter" },
        { "value": "whatsapp", "label": "Whatsapp" },
        { "value": "linkedin", "label": "Linkedin" },
        { "value": "instagram", "label": "Instagram" },
      ]

      const [skills,setSkills] = useState([])
      const [days,setDays] = useState([])
      const [media,setMedias] = useState([])
      const [time,setTime] = useState('')

      const setSkillsData = (e)=>{
            const {checked,value} = e.target
                setSkills(preSkills=>{
                    if(checked){
                       return [...preSkills, value]
                    }
                       return preSkills.filter((skill) => skill !== value)
   
               })
            }
      const setMediaData = (data)=>{
        const newData = data.map(item=> item.value)
        setMedias(newData)
            }
      const setDayData = (data)=>{
            const newData = data.map(item=> item.value)
            setDays(newData)
            }

      const setTimeData = (data)=>{
        setTime(data.value)
            }

            const [button,setButton] = useState(false)

            console.log(skills)
      const submitApplication = (e)=>{
        setButton(true)
        e.preventDefault()
        const presentTime = new Date()
        const form = e.target
        const fullName = form.fullName.value
        const image = form.image.value
        const age = form.age.value
        const xp = form.xp.value
        const bio = form.bio.value
        const email = user?.email
        const uid = user?.uid
        const applyDate= presentTime.toLocaleString()
        const status = 'pending'

        if(skills.length < 1 || time==='' || days.length < 1 || media.length <1){
            toast.error('You need to fill up the form')
            setButton(false)
        }
        else{
            axiosSecure.post('/trainerApply', {fullName, email, uid, image, age, skills, time, days,media, applyDate,status,xp,bio})
            .then(()=>{
                toast.success("Your application has been submitted successfully!")
                navigate('/dashboard/activityLog')
            })
            .catch(()=>{
              setButton(false)
                toast.error('Something went wrong')
            })
        }
      }



        const {data:application,isFetching} = useQuery({
          queryKey: ['application'],
          queryFn: ()=>
                    axiosSecure.get(`/application/${user?.uid}`)
                    .then(res=>{
                        return res.data
                  }),
        enabled: !!user
     
      })

      useEffect(()=>{
        setSkills([])
        setDays([])
        setMedias([])
      },[isFetching])


     
      if(isFetching){
        return <Loading/>
      }
      if(application){
          return  <div className='w-11/12 max-w-[1200px] mx-auto h-[100vh] flex justify-center items-center'>
          <div className='w-full flex justify-center items-center flex-col'>
            <h1 className='text-xl font-semibold text-center'>Your have already submitted an application</h1>
            <button className='bg-gray-300 p-3 font-semibold text-sm rounded-lg mt-5 cursor-default'>Application status : <span className='text-success'>Pending</span></button>
          </div>
    </div>
      }
  
      if(!application){
        return (
          <div>
               <Helmet>
                <title>Active Edge | Trainer Application</title>
            </Helmet>
              <ToastContainer/>
         <div className="">
    <div className="">
  
      <div className="mx-auto w-11/12 max-w-[800px] shrink-0 mt-16 pt-5 shadow-2xl bg-base-100">
        <h1 className='text-3xl font-bold text-center'>Apply for trainer role</h1>
       <form className="card-body grid md:grid-cols-2 lg:grid-cols-3 gap-5" onSubmit={submitApplication}>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Full Name</span>
         </label>
         <input type="text" placeholder="full name" name='fullName' className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Email</span>
         </label>
         <input type="email" disabled value={user?.email} className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Age</span>
         </label>
         <input type="number" placeholder="age" min='18' max='70' name='age' className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Years of experience</span>
         </label>
         <input type="number" placeholder="Years of experience" min='1'  name='xp' className="input input-bordered" required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Profile Image</span>
         </label>
         <input type="text" placeholder="photo URL" defaultValue={user?.photoURL} className="input input-bordered" name='image' required />
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Choose your social media</span>
         </label>
         <Select  isMulti  className="basic-multi-select"
     classNamePrefix="select"  options={mediaOptions} onChange={setMediaData}></Select>
       </div>
       <div className="form-control lg:col-span-3">
         <label className="label">
           <span className=" font-bold">Skills</span>
         </label>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2'>
        <div>
         <input id='personalTraining'  type="checkbox" onChange={setSkillsData} name='skills' value='Personal Training'  />
           <label htmlFor='personalTraining'> Personal Training</label>
         </div>
        <div>
         <input id='groupFitnessInstruction' type="checkbox" onChange={setSkillsData} name='skills' value='Group Fitness Instruction'  />
           <label htmlFor='groupFitnessInstruction'> Group Fitness Instruction</label>
         </div>
         <div>
         <input id='flexibilityTraining' type="checkbox" onChange={setSkillsData} name='skills' value='Flexibility Training' />
           <label htmlFor='flexibilityTraining'> Flexibility Training</label>
         </div>
         <div>
         <input id='nutritionCounseling' type="checkbox" onChange={setSkillsData} name='skills' value='Nutrition Counseling'  />
           <label htmlFor='nutritionCounseling'> Nutrition Counseling</label>
         </div>
         <div>
         <input id='strengthTraining' type="checkbox" onChange={setSkillsData} name='skills' value='Strength Training' />
           <label htmlFor='strengthTraining'> Strength Training</label>
         </div>
         <div>
         <input id='cardiovascularTraining' type="checkbox" onChange={setSkillsData} name='skills' value='Cardiovascular Training' />
           <label htmlFor='cardiovascularTraining'> Cardiovascular Training</label>
         </div>
         <div>
         <input id='sportsCoaching' type="checkbox" onChange={setSkillsData} name='skills' value='Sports Coaching'  />
           <label htmlFor='sportsCoaching'> Sports Coaching</label>
         </div>
         <div>
         <input id='bodybuildingCoaching' type="checkbox" onChange={setSkillsData} name='skills' value='Bodybuilding Coaching' />
           <label htmlFor='bodybuildingCoaching'> Bodybuilding Coaching</label>
         </div>
         <div>
         <input id='cycling/SpinInstruction' type="checkbox" onChange={setSkillsData} name='skills' value='Cycling/Spin Instruction'  />
           <label htmlFor='cycling/SpinInstruction'> Cycling/Spin Instruction</label>
         </div>
         <div>
         <input id='boxingTraining' type="checkbox" onChange={setSkillsData} name='skill' value='Boxing Training' />
           <label htmlFor='boxingTraining'> Boxing Training</label>
         </div>
        </div>
       </div>
  
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Available days a week</span>
         </label>
         <Select  isMulti  className="basic-multi-select"
     classNamePrefix="select"  options={daysOptions} onChange={setDayData}></Select>
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Available time in a day</span>
         </label>
         <Select options={timeOptions} onChange={setTimeData}></Select>
       </div>
       <div className="form-control">
         <label className="label">
           <span className=" font-bold">Write About Yourself</span>
         </label>
         <textarea name='bio' placeholder='Write in 150 characters' required maxLength={150} className='min-h-[7vh] h-[7vh] max-h-[20vh] input input-bordered pt-2'></textarea>
       </div>
       <div className="form-control mt-6">
         <button className="btn bg-bgCommon hover:bg-bgHover text-white" disabled={button}>Apply</button>
       </div>
     </form>
      </div>
    </div>
  </div>
          </div>
      );
      }
};

export default TrainerApplication;