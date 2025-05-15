'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { GalleryImage } from '@/types/homepage';
import { Autoplay } from 'swiper/modules';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ImageSliderProps {
  images: GalleryImage[];
  mobileImages: GalleryImage[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, mobileImages }) => {
  const isMobile = useIsMobile();
  const selectedImages = isMobile ? mobileImages : images;
  // const handleClick = (swiper: any) => {
  //   swiper.slideNext(); // Move to the next slide on click
  // };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0"
    // onClick={() => window.swiper?.slideNext()}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        speed={1}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {selectedImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-screen">
              <Image
                src={image.asset.url}
                alt={image.alt || 'Image'}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
