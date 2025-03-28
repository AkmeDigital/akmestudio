// src/components/ImageSlider.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { GalleryImage } from '@/types/homepage';

interface ImageSliderProps {
  images: GalleryImage[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  // const handleClick = (swiper: any) => {
  //   swiper.slideNext(); // Move to the next slide on click
  // };

  return (
    <div 
      className="absolute top-0 left-0 w-full h-full z-0" // Full-screen, positioned at the back
      onClick={() => window.swiper?.slideNext()}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => { window.swiper = swiper; }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-screen"> {/* Ensures each slide fills the screen */}
              <Image
                src={image.asset.url}
                alt={image.alt || 'Image'}
                layout="fill" // Makes the image cover the entire slide
                objectFit="cover" // Crops to fill the space
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
