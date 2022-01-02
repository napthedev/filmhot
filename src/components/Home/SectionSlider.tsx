import { Swiper, SwiperSlide } from "swiper/react";

import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
}

const Slider: FC<SliderProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      loop
      slidesPerView="auto"
      slidesPerGroupAuto
      spaceBetween={30}
    >
      {images.map((item) => (
        <SwiperSlide className="!w-[175px]" key={item.image}>
          <Link to={item.link}>
            <div className="rounded-lg overflow-hidden bg-dark-lighten group">
              <LazyLoadImage
                className="group-hover:brightness-75 transition duration-300 object-cover w-[175px] h-[246px]"
                src={item.image}
                width={175}
                height={246}
                effect="opacity"
                alt=""
              />
              <h1 className="group-hover:text-primary transition-none duration-300 pb-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </h1>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
