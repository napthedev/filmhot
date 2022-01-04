import { FC, useRef } from "react";

import HlsPlayer from "react-hls-player";
import { subtitleProxy } from "../shared/constants";

interface MobilePlayerProps {
  sources: {
    quality: number;
    url: string;
  }[];
  subtitles: {
    lang: string;
    language: string;
    url: string;
  }[];
}

const MobilePlayer: FC<MobilePlayerProps> = ({ sources, subtitles }) => {
  const playerRef = useRef(null);

  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center group bg-black">
        <HlsPlayer
          crossOrigin=""
          playsInline
          controls
          autoPlay={false}
          playerRef={playerRef}
          src={sources[0].url}
          className="w-full h-full"
        >
          {subtitles.map((subtitle, index) => (
            <track
              kind="subtitles"
              srcLang={subtitle.lang}
              label={subtitle.language}
              src={subtitleProxy(subtitle.url)}
              default={index === 0}
            />
          ))}
        </HlsPlayer>
      </div>
    </div>
  );
};

export default MobilePlayer;
