import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { IMAGE_CARD_SIZE } from "@/shared/constants";

import ImageFade from "../Shared/ImageFade";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
  coverType: 0 | 1;
}

const Slider: FC<SliderProps> = ({ images, coverType }) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView="auto"
      slidesPerGroupAuto
    >
      {images.map((item, index) => (
        <SwiperSlide
          style={{
            width: IMAGE_CARD_SIZE[coverType || 1].width,
          }}
          className={classNames({
            "!ml-[30px]": index !== 0,
          })}
          key={item.image}
        >
          <Link href={item.link} prefetch={false}>
            <a className="block rounded-lg overflow-hidden bg-dark-lighten group">
              <ImageFade
                style={{
                  width: IMAGE_CARD_SIZE[coverType || 1].width,
                  height: IMAGE_CARD_SIZE[coverType || 1].height,
                }}
                className="group-hover:brightness-75 transition duration-300 object-cover"
                src={item.image}
                width={IMAGE_CARD_SIZE[coverType || 1].width}
                height={IMAGE_CARD_SIZE[coverType || 1].height}
                alt=""
              />
              <h1 className="group-hover:text-primary transition duration-300 py-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </h1>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
