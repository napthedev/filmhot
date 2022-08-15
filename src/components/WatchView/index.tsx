import HlsPlayer from "@ducanh2912/react-hls-player";
import dynamic from "next/dynamic";
import { FC, useEffect } from "react";

// import Comment from "./Comment";
import { MovieDetail } from "@/types/movie";

import NavBar from "../Layout/Navbar";
import MetaData from "./Metadata";
import Similar from "./Similar";

const Player = dynamic(() => import("./Player"), { ssr: false });

interface WatchViewProps {
  data: MovieDetail;
  sources:
    | {
        quality: number;
        url: string;
      }[];
  subtitles:
    | {
        language: string;
        url: string;
        lang: string;
      }[];
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

  useEffect(() => {
    if (!data) return;
    let existing = JSON.parse(
      localStorage.getItem("filmhot-recent") || "[]"
    ) as {
      id: string;
      category: number;
      coverVerticalUrl: string;
      name: string;
    }[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data.id);

    existing.unshift({
      id: data.id,
      category: data.category,
      coverVerticalUrl: data.coverVerticalUrl,
      name: data.name,
    });

    localStorage.setItem("filmhot-recent", JSON.stringify(existing));
  }, [data]);

  return (
    <>
      {/* {data && (
        <Title
          value={`Watch ${data.name}${
            typeof episodeIndex !== "undefined"
              ? ` - Episode ${episodeIndex + 1}`
              : ""
          } - FilmHot`}
        />
      )} */}
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />

          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full h-0 pb-[56.25%] relative">
                <div className="absolute inset-0 w-full h-full bg-black">
                  <Player
                    playerKey={playerKey}
                    primaryColor="#0D90F3"
                    src={sources}
                    subtitles={
                      subtitles?.map((subtitle) => ({
                        ...subtitle,
                        url: `/api/subtitle?url=${encodeURIComponent(
                          subtitle.url
                        )}`,
                      })) || []
                    }
                  >
                    {(ref, props) => (
                      <HlsPlayer playerRef={ref} {...props} src={props.src} />
                    )}
                  </Player>
                </div>
              </div>

              <MetaData data={data} episodeIndex={episodeIndex} />

              {/* {data && <Comment data={data} episodeIndex={episodeIndex} />} */}
            </div>

            <Similar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchView;
