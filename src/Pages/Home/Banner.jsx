import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';



const Banner = () => {
    return (
        <div className='h-[80vh] flex items-center justify-center gap-5 w-11/12 mx-auto max-w-[1000px]'>
            <div className='flex flex-col justify-center items-center w-1/2 h-full'>
                <h1>Elevate Your Fitness Journey</h1>
                <p>Join our cutting-edge platform to track progress, set goals, and connect with a vibrant fitness community. Start transforming your lifestyle today!</p>
                <Link><button>Classes</button></Link>
            </div>
              <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper h-full w-1/2"
      >
        <SwiperSlide className='h-full'><img src='./photos/banner1.jpg' className='w-full h-full object-contain'/></SwiperSlide>
        <SwiperSlide className='h-full'><img src='./photos/banner2.jpg' className='w-full h-full object-contain'/></SwiperSlide>
        <SwiperSlide className='h-full'><img src='./photos/banner3.jpg' className='w-full h-full object-contain'/></SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Banner;