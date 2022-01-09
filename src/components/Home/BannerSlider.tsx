import { Swiper, SwiperSlide } from "swiper/react";

import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { resizeImage } from "../../shared/constants";

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
          <Link to={item.link}>
            <div className="w-full h-0 pb-[42%] relative">
              <LazyLoadImage
                className="absolute top-0 left-0 w-full h-full object-cover opacity-75"
                src={resizeImage(item.image, "900")}
                alt=""
                effect="opacity"
              />
              <h1 className="scale-100 absolute left-[7%] bottom-[10%] text-xl md:text-3xl max-w-[86%] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </h1>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
