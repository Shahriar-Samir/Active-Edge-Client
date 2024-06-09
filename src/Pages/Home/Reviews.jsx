import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import Heading from '../../Components/Heading';


const Reviews = () => {
    return (
        <div className='mt-28 w-11/12 mx-auto max-w-[1200px]'>
 <Heading title={'Reviews'} details={'All the reviews given by our members'}/>
                 <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
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
        className="mySwiper mt-12"
      >
        <SwiperSlide>
          <Slide/>
        </SwiperSlide>
        <SwiperSlide>
          <Slide/>
        </SwiperSlide>
        <SwiperSlide>
            <Slide/>
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Reviews;


const Slide = () => {
    return (
        <div className='p-4 bg-[skyblue] text-white'>
            <div>
           <div className='flex justify-center'>
           <img src="https://swiperjs.com/demos/images/nature-1.jpg"  className='w-[60px] h-[60px] rounded-full'/>
           </div>
            <div>
            <h1 className='text-center mt-3 text-lg font-semibold'>Emily R.</h1>
            <p className='text-center'>Germany@gmail.com</p>
            </div>
            </div>
            <div className='mt-3'>
            <h1 className='text-xl font-bold'>This is goood</h1>
            <p>This fitness tracker has completely transformed my workout routine! The personalized plans and real-time progress tracking keep me motivated every day. Highly recommend!</p>
            </div>
            <div className='mt-4 text-xl'>
            <p>Rating: ★★★★★</p>
            </div>
            
        </div>
    );
};

