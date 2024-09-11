import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Heading from '../../Components/Heading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';
import  useMediaQuery  from '@mui/material/useMediaQuery';


const Reviews = () => {

  const min800 = useMediaQuery('(min-width:800px)');
  const min600 = useMediaQuery('(min-width:600px)');
  
  const axiosPublic = useAxiosPublic()
  const {data:reviews,isFetching} = useQuery({
    queryKey: ['reviews'],
    initialData: [],
    queryFn: ()=>
        axiosPublic.get('/allReviews')
        .then(res=>{
            return  res.data
        })
})


  if(isFetching){
    return <Loading/>
  }

  return (
        <div className='mt-28 w-11/12 mx-auto max-w-[1200px]'>
 <Heading title={'Reviews'} details={'All the reviews given by our members'}/>
                 <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={min800? 3 : min600? 2 : 1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper mt-12 w-11/12 mx-auto"
      >
        {
          reviews?.map(review=>{
            return <SwiperSlide key={review._id}><Slide item={review}/></SwiperSlide>
          })
        }
      </Swiper>
        </div>
    );
};

export default Reviews;


const Slide = ({item}) => {

    return (
        <div className='p-4 bg-transparent text-black border-2 border-[#15D7F7] h-[340px]'>
            <div>
           <div className='flex justify-center'>
           <img src={item?.photoURL}  className='w-[60px] h-[60px] rounded-full'/>
           </div>
           <div className='flex justify-center items-center'>
           <div className="rating mt-3">
  <input type="radio" className="mask mask-star-2 bg-orange-400" checked={item?.rating === 1? true :false}/>
  <input type="radio" className="mask mask-star-2 bg-orange-400" checked={item?.rating === 2? true :false}/>
  <input type="radio" className="mask mask-star-2 bg-orange-400" checked={item?.rating === 3? true :false}/>
  <input type="radio" className="mask mask-star-2 bg-orange-400" checked={item?.rating === 4? true :false}/>
  <input type="radio" className="mask mask-star-2 bg-orange-400" checked={item?.rating === 5? true :false}/>
</div>
           </div>
            <div>
            <h1 className='text-center mt-3 text-lg font-semibold'>{item?.displayName}</h1>
            <p className='text-center'>{item?.email}</p>
            </div>
            </div>
            <div className='mt-3'>
            <h1 className='text-xl font-bold'>{item?.title}</h1>
            <p>{item?.texts}</p>
            </div>
            <div className='mt-4 text-xl'>
            
            </div>
            
        </div>
    );
};

