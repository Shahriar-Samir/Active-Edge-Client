import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';



const Banner = () => {
    return (
        <div className='h-[100vh] flex items-center justify-center flex-col-reverse md:flex-row gap-5 w-11/12 mx-auto max-w-[1000px]'>
            <div className='flex flex-col justify-center items-start w-full md:w-1/2 gap-4 h-full'>
                <h1 className='text-5xl text-center md:text-start md:text-7xl font-bold'>Elevate Your Fitness Journey</h1>
                <p className='text-center md:text-start text-lg'>Join our cutting-edge platform to track progress, set goals, and connect with a vibrant fitness community. Start transforming your lifestyle today!</p>
                <div className='flex justify-center items-center md:justify-start w-full mt-4 md:mt-0'>
                <Link to='/allClasses'><button className='btn px-10 text-xl bg-bgCommon text-white font-bold hover:bg-bgHover'>Classes</button></Link>
                </div>
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
        className="mySwiper h-full mt-5 w-full md:w-1/2 md:mt-0"
      >
        <SwiperSlide className='h-full'><img src='./photos/banner1.jpg' className='w-full h-full object-contain'/></SwiperSlide>
        <SwiperSlide className='h-full'><img src='./photos/banner2.jpg' className='w-full h-full object-contain'/></SwiperSlide>
        <SwiperSlide className='h-full'><img src='./photos/banner3.jpg' className='w-full h-full object-contain'/></SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Banner;