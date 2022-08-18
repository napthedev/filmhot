import { FC } from "react";
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

import { resizeImage } from "@/shared/constants";

const ImageFade: FC<LazyLoadImageProps> = ({
  src,
  width,
  height,
  ...props
}) => {
  return (
    <LazyLoadImage
      {...props}
      src={resizeImage(src!, width, height)}
      width={width}
      height={height}
      effect="opacity"
    />
  );
};

export default ImageFade;
