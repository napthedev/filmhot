import { FC } from "react";
import { Player as VideoPlayer, PlayerProps } from "react-tuby";

const Player: FC<PlayerProps> = (props) => {
  return <VideoPlayer {...props}></VideoPlayer>;
};

export default Player;
