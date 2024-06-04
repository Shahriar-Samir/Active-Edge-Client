import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TrainerApplication = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

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

      const [skills,setSkills] = useState([])
      const [days,setDays] = useState([])
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
      const setDayData = (data)=>{
            const newData = data.map(item=> item.value)
            setDays(newData)
            }

      const setTimeData = (data)=>{
        setTime(data.value)
            }

      const submitApplication = (e)=>{
        e.preventDefault()
        const presentTime = new Date()
        const form = e.target
        const fullName = form.fullName.value
        const image = form.image.value
        const age = form.age.value
        const email = user?.email
        const uid = user?.uid
        const applyDate= presentTime.toLocaleString()
        const status = 'pending'

        if(skills.length < 1 || time==='' || days.length < 1){
            toast.error('You need to fill up the form')
        }
        else{
            axiosSecure.post('/trainerApply', {fullName, email, uid, image, age, skills, time, days, applyDate,status})
            .then(()=>{
                toast.success("Your application has been submitted successfully!")
            })
            .catch(()=>{
                toast.error('Something went wrong')
            })
        }
      }



        const {data:application} = useQuery({
          queryKey: ['application'],
          queryFn: ()=>
                    axiosSecure.get(`/application/${user?.uid}`)
                    .then(res=>{
                        return res.data
                  }),
        enabled: !!user
     
      })

      const newApplication = (id)=>{
          axiosSecure.delete(`/deleteApplication/${id}`)
          .then(()=>{
            setStatus(false)
          })
          .catch(()=>{
            toast.error('Something went wrong')
          })
      }

      const [status,setStatus] = useState('')

      useEffect(()=>{
            if(application){
              setStatus(true)
            }
      },[application])



    return (
        <div>
            <ToastContainer/>
       <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    {status === true?
    <div className='w-1/2'>
        {
          application.status==='rejected'? <div className='w-full flex justify-center items-center flex-col'>
            <h1 className='text-xl font-semibold'>Your previous application has been rejected</h1>
        <button className='btn bg-gray-300 mt-8' onClick={()=>newApplication(application._id)}>New Application</button>
          </div> :
          <div className='w-full flex justify-center items-center flex-col'>
            <h1 className='text-xl font-semibold'>Your have already submitted an application</h1>
            <button className='bg-gray-300 p-3 font-semibold text-sm rounded-lg mt-5 cursor-default'>Application status : <span className='text-success'>Pending</span></button>
          </div>
        }
    </div>
     : 
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
     <form className="card-body" onSubmit={submitApplication}>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Full Name</span>
       </label>
       <input type="text" placeholder="full name" name='fullName' className="input input-bordered" required />
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Email</span>
       </label>
       <input type="email" disabled value={user?.email} className="input input-bordered" required />
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Age</span>
       </label>
       <input type="number" placeholder="age" min='18' max='70' name='age' className="input input-bordered" required />
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Profile Image</span>
       </label>
       <input type="text" placeholder="photo URL" defaultValue={user?.photoURL} className="input input-bordered" name='image' required />
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Skills</span>
       </label>
      <div className='grid grid-cols-2 gap-2'>
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
         <span className="label-text">Available days a week</span>
       </label>
       <Select  isMulti  className="basic-multi-select"
   classNamePrefix="select"  options={daysOptions} onChange={setDayData}></Select>
     </div>
     <div className="form-control">
       <label className="label">
         <span className="label-text">Available time in a day</span>
       </label>
       <Select options={timeOptions} onChange={setTimeData}></Select>
     </div>
     <div className="form-control mt-6">
       <button className="btn btn-primary">Apply</button>
     </div>
   </form>
    </div>}
  </div>
</div>
        </div>
    );
};

export default TrainerApplication;