import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { Link } from 'react-router';



export default function Banner() {
  const slides = [
    {
      title: 'Post Services, Find and Apply Jobs',
      subtitle: 'FOR FREELANCE, CANDIDATE',
      description: 'Post Services, Find and Apply Jobs',
      button: 'Become a Freelancer',
      image: 'slider/image.jpeg',
    },
    {
      title: 'Hire Talent for Your Next Project',
      subtitle: 'FOR BUSINESSES',
      description: 'Connect with freelancers and get tasks done quickly.',
      button: 'Browse Gigs',
      image: 'slider/image02.jpeg',
    },
    {
      title: 'Discover Remote Work Opportunities',
      subtitle: 'FOR JOB SEEKERS',
      description: 'Search and apply for top remote jobs across industries',
      button: 'Find Jobs',
      image: 'slider/image03.jpg',
    },
    {
      title: 'Grow Your Business with Expert Help',
      subtitle: 'FOR STARTUPS',
      description: 'Hire skilled freelancers to bring your ideas to life',
      button: 'Hire an Expert',
      image: 'slider/image04.jpeg',
    },
  ];
  return (
    <div className="w-full md:h-[80vh] overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-[30rem] md:bg-cover md:bg-center bg-no-repeat flex items-center justify-start px-4 md:px-20"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-lg text-blue-800 bg-gray-50 shadow-md p-6 rounded-xl"
              >
                <p className="text-sm font-bold font-[Mulish] tracking-widest uppercase">
                  {slide.subtitle}
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold font-[Suse] my-4 py-2">
                  {slide.title}
                </h2>
                <p className="mb-4 text-blue-500 font-semibold font-[sora] ">{slide.description}</p>
                <Link
                  to="/"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold font-[Raleway] py-2 px-4 rounded shadow"
                >
                  {slide.button}
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
