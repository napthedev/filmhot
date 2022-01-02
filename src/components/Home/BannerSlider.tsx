import { Swiper, SwiperSlide } from "swiper/react";

import { FC } from "react";
import { Navigation } from "swiper";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
}

const BannerSlider: FC<SliderProps> = ({ images }) => {
  return (
    <Swiper
      className="rounded-2xl overflow-hidden"
      modules={[Navigation]}
      navigation
      loop
      slidesPerView={1}
    >
      {images.map((item) => (
        <SwiperSlide key={item.image}>
          <div className="relative">
            <div className="w-full h-0 pb-[42%] relative">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover opacity-75"
                src={item.image}
                alt=""
              />
            </div>
            <h1 className="absolute left-10 bottom-10 text-3xl max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
              {item.title}
            </h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
