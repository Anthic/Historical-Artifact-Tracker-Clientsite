import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FiArrowRight } from 'react-icons/fi';
import './Slide.css';

import egyptianArtifact from '../assets/bg-image1.jpg';
import romanArtifact from '../assets/bg-image2.jpg';
import mayanArtifact from '../assets/bg-image3.jpg';

const Slide = () => {
  const slides = [
    {
      title: "Ancient Egyptian Relics",
      description: "Discover artifacts from the land of pharaohs and pyramids",
      image: egyptianArtifact
    },
    {
      title: "Roman Empire Artifacts",
      description: "Explore treasures from the heart of ancient Rome",
      image: romanArtifact
    },
    {
      title: "Mayan Civilization",
      description: "Unearth secrets of the ancient Mesoamerican culture",
      image: mayanArtifact
    }
  ];

  return (
    <div className="relative py-8 md:py-5 lg:py-5 px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        speed={1000}
        className="historic-swiper w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full">
            <div 
              className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden group w-full"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white text-center">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                  {slide.title}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <button className="flex items-center bg-gradient-to-t from-emerald-300 to-emerald-300 px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-all duration-300 mx-auto text-white">
                  <span className="text-base sm:text-lg">Explore Now</span>
                  <FiArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;