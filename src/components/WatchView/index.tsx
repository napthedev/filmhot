import Comment from "./Comment";
import DesktopPlayer from "../Player/Desktop";
import { DetailType } from "../../shared/types";
import { FC } from "react";
import MetaData from "./MetaData";
import MobilePlayer from "../Player/Mobile";
import NavBar from "../NavBar";
import Similar from "./Similar";
import Skeleton from "../Skeleton";
import Title from "../Title";
import { isMobile } from "../../shared/utils";

interface WatchViewProps {
  data?: DetailType;
  sources:
    | {
        quality: number;
        url: string;
      }[]
    | undefined;
  subtitles?:
    | {
        language: string;
        url: string;
        lang: string;
      }[]
    | undefined;
  episodeIndex?: number;
}

const WatchView: FC<WatchViewProps> = ({
  data,
  sources,
  subtitles,
  episodeIndex,
}) => {
  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";
  const playerKey = `${mediaType}-${data?.id}${
    episodeIndex ? `-${episodeIndex}` : ""
  }`;

  return (
    <>
      {data && (
        <Title
          value={`Watch ${data.name}${
            typeof episodeIndex !== "undefined"
              ? ` - Episode ${episodeIndex + 1}`
              : ""
          } - FilmHot`}
        />
      )}
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />

          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full">
                {data && sources && subtitles ? (
                  <>
                    {isMobile() ? (
                      <MobilePlayer
                        playerKey={playerKey}
                        sources={sources}
                        subtitles={subtitles}
                      />
                    ) : (
                      <DesktopPlayer
                        playerKey={playerKey}
                        sources={sources}
                        subtitles={subtitles}
                      />
                    )}
                  </>
                ) : (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <Skeleton className="absolute top-0 left-0 w-full h-full" />
                  </div>
                )}
              </div>

              <MetaData data={data} episodeIndex={episodeIndex} />

              {data && <Comment data={data} episodeIndex={episodeIndex} />}
            </div>

            <Similar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchView;
