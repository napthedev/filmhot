import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";

import { MovieInfo } from "@/types/movie";
import { trpc } from "@/utils/trpc";

import NavBar from "../Layout/Navbar";
import Comment from "./Comment";
import MetaData from "./Metadata";
import Similar from "./Similar";

const Player = dynamic(() => import("./Player"), { ssr: false });

type WatchViewProps = MovieInfo & {
  episodeIndex?: number;
};

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

  const [willFetchLatestSource, setWillFetchLatestSource] = useState(false);

  const { data: newData } = trpc.useQuery(
    [
      "video.info",
      {
        id: data.id,
        category: typeof episodeIndex === "undefined" ? 0 : 1,
        episodeIndex,
      },
    ],
    { enabled: willFetchLatestSource }
  );

  useEffect(() => {
    // @ts-ignore
    if (window.xhrModified) return;
    const oldMethod = XMLHttpRequest.prototype.open;
    // @ts-ignore
    XMLHttpRequest.prototype.open = function (
      method,
      url,
      async,
      username,
      password
    ) {
      if (typeof url === "string" && url.includes("m3u8")) {
        this.addEventListener("error", () => {
          setWillFetchLatestSource(true);
        });
        this.addEventListener("loadend", () => {
          if (this.status >= 300) {
            setWillFetchLatestSource(true);
          }
        });
      }
      return oldMethod.call(this, method, url, async, username, password);
    };

    // @ts-ignore
    window.xhrModified = true;
  }, []);

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
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />

          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full h-0 pb-[56.25%] relative">
                <div className="absolute inset-0 w-full h-full bg-black">
                  <Player
                    key={playerKey}
                    playerKey={playerKey}
                    primaryColor="#0D90F3"
                    src={newData?.sources || sources}
                    subtitles={
                      subtitles?.map((subtitle: any) => ({
                        ...subtitle,
                        url: `/api/subtitle?url=${encodeURIComponent(
                          subtitle.url
                        )}`,
                      })) || []
                    }
                  ></Player>
                </div>
              </div>

              <MetaData data={data} episodeIndex={episodeIndex} />

              <Comment data={data} episodeIndex={episodeIndex} />
            </div>

            <Similar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchView;
