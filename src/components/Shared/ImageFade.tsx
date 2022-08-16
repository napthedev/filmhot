import classNames from "classnames";
import Image, { ImageProps } from "next/future/image";
import { FC, useState } from "react";

const ImageFade: FC<ImageProps> = ({ alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={classNames(
        className,
        {
          "opacity-100": isLoaded,
          "opacity-0": !isLoaded,
        },
        "transition duration-200"
      )}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      onLoadCapture={() => setIsLoaded(true)}
      onLoadingComplete={() => setIsLoaded(true)}
    />
  );
};

export default ImageFade;
