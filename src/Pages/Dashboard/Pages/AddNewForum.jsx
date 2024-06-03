import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {toast, ToastContainer} from 'react-toastify'

const AddNewForum = () => {
      const axiosSecure = useAxiosSecure()
      const presentTime = new Date();

  const postSubmit = (e)=>{
        e.preventDefault()
        const form = e.target 
        const title = form.title.value
        const texts = form.texts.value
       axiosSecure.post('/addForumPost',{title,texts, date:presentTime.toLocaleString()})
       .then(res=>{
            toast.success('Post submitted successfully!')
       })
       .catch(()=>{
            toast.error('Something went wrong')
       })
  }

    return (
        <div>
          <ToastContainer/>
           <h1 className='text-xl text-center font-bold mt-5'>Add New Forum</h1>
           <form className="card-body w-11/12 max-w-[600px] mx-auto" onSubmit={postSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" placeholder="Title" name="title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Post</span>
          </label>
          <textarea placeholder="write something" name="texts" className="input input-bordered min-h-[30vh] h-[35vh] max-h-[40vh] p-4" required ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Post</button>
        </div>
      </form>
        </div>
    );
};

export default AddNewForum;