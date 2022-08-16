import { FC } from "react";
import { Player as VideoPlayer, PlayerProps } from "react-tuby";

const Player: FC<PlayerProps> = ({ src, ...props }) => {
  return (
    <VideoPlayer
      src={
        typeof src === "string"
          ? src.replace("http:", "https:")
          : src.map((item) => ({
              quality: item.quality,
              url: item.url.replace("http:", "https:"),
            }))
      }
      {...props}
    ></VideoPlayer>
  );
};

export default Player;
