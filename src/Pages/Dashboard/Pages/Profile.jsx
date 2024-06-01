import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Profile = () => {
    const {user} = useContext(AuthContext)
    const {displayName,email,photoURL} = user? user : ''
    console.log(user)
    return (
        <div className='w-4/5 pt-10 pe-10'>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
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
};

export default Profile;