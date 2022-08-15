import { FC, Ref, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Skeleton from "@/components/Shared/Skeleton";

const InfiniteLoader: FC<{ forwardedRef: Ref<HTMLDivElement> }> = ({
  forwardedRef,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(innerWidth);
  }, []);

  return (
    <>
      <Skeleton className="my-8 h-6 w-full max-w-[200px]" />
      <div ref={forwardedRef} className="overflow-hidden">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView="auto"
          slidesPerGroupAuto
          spaceBetween={30}
        >
          {[...new Array(Math.ceil(windowWidth / 200))].map((_, index) => (
            <SwiperSlide className="!w-[175px]" key={index}>
              <Skeleton className="w-[175px] h-[246px] rounded-xl" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default InfiniteLoader;
