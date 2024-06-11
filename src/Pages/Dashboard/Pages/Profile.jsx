import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../../Components/Loading';

const Profile = () => {
    const {user,updateUser} = useContext(AuthContext)
    const {displayName,email,photoURL} = user

  const updateProfile = (e)=>{
      e.preventDefault()
      const form = e.target 
      const displayName = form.displayName.value
      const photoURL = form.photoURL.value
      updateUser({photoURL,displayName})
      .then(()=>{
        toast.success("Profile updated")
      })
      .catch(()=>{
        toast.error('Something went wrong')
      })
  }
  
  if(user){

    return (
        <div className='w-4/5 pt-10 pe-10'>
          <ToastContainer className='z-30'/>
<dialog id="my_modal_3" className="modal z-20">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form className="card-body" onSubmit={updateProfile}>
      <h1 className='text-center text-2xl font-bold'>Update Profile</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='displayName' placeholder="Name" defaultValue={displayName} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name='photoURL' defaultValue={photoURL} placeholder="photo URL" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-bgCommon hover:bg-bgHover">Update Profile</button>
        </div>
      </form>
  </div>
</dialog>
          <div className='w-full max-w-[600px]'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2'>
            <img src={photoURL} className='w-[150px] h-[150px] object-cover rounded-full'/>
            <div>
            <h1 className='font-bold'>Member</h1>
            </div>
            </div>
            <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Edit Profile</button>
            </div>
            <div className="mt-6 w-full max-w-[600px] overflow-auto">
  <table className="table">
    <tbody>
      {/* row 1 */}
      <tr>
   
        <th className='text-lg'>Name</th>
        <td className='text-lg'>{displayName}</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th className='text-lg'>Email</th>
        <td className='text-lg'>{email}</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th className='text-lg'>Photo URL</th>
        <td className='text-lg'>{photoURL}</td>
      </tr>
    </tbody>
  </table>
</div>
          </div>
        </div>
    );
  }
  
  return <Loading/>

};

export default Profile;