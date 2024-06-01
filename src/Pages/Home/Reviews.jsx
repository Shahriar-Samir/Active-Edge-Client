import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';


const Reviews = () => {
    return (
        <div>
            <h1 className='text-center text-2xl font-bold'>Reviews </h1>
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
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
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
        <div className='p-4 h-[300px]'>
            <div>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg"  className='w-[50px] h-[50px]'/>
            <div>
            <h1>Emily R.</h1>
            <p>Germany</p>
            </div>
            </div>
            <p>Rating: ★★★★★</p>
            <h1>This is goood</h1>
            <p>This fitness tracker has completely transformed my workout routine! The personalized plans and real-time progress tracking keep me motivated every day. Highly recommend!</p>
        </div>
    );
};

