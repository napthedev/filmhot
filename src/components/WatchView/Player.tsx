import HlsPlayer from "@ducanh2912/react-hls-player";
import { FC } from "react";
import { Player as VideoPlayer, PlayerProps } from "react-tuby";

const Player: FC<PlayerProps> = (props) => {
  return (
    <VideoPlayer {...props}>
      {(ref, props) => <HlsPlayer playerRef={ref} {...props} src={props.src} />}
    </VideoPlayer>
  );
};

export default Player;
