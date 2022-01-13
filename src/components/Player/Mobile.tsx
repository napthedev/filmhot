import { FC, useRef, useState } from "react";

import HlsPlayer from "react-hls-player";
import { subtitleProxy } from "../../shared/constants";

interface MobilePlayerProps {
  playerKey: string;
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

const MobilePlayer: FC<MobilePlayerProps> = ({
  playerKey,
  sources,
  subtitles,
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [loadedData, setLoadedData] = useState(false);

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
          onLoadedData={() => {
            setLoadedData(true);
            const currentTime = Number(
              localStorage.getItem(`${playerKey}-time`) as string
            );
            playerRef.current && (playerRef.current.currentTime = currentTime);
          }}
          onTimeUpdate={() => {
            localStorage.setItem(
              `${playerKey}-time`,
              String(playerRef.current?.currentTime || 0)
            );
          }}
        >
          {loadedData &&
            subtitles.map((subtitle, index) => (
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
