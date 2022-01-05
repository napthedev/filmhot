import DesktopPlayer from "./Player/Desktop";
import { DetailType } from "../shared/types";
import { FC } from "react";
import ImageFade from "./ImageFade";
import { Link } from "react-router-dom";
import MobilePlayer from "./Player/Mobile";
import Search from "./Search";
import Skeleton from "./Skeleton";
import Title from "./Title";
import { isMobile } from "../shared/utils";
import { resizeImage } from "../shared/constants";

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
          <div className="flex justify-between items-center mt-7">
            <Link to="/" className="flex items-center gap-2 text-2xl">
              <img className="w-8 h-8" src="/icon.png" alt="" />
              <span>FilmHot</span>
            </Link>

            <Search />
          </div>
          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full">
                {data && sources && subtitles ? (
                  <>
                    {isMobile() ? (
                      <MobilePlayer sources={sources} subtitles={subtitles} />
                    ) : (
                      <DesktopPlayer sources={sources} subtitles={subtitles} />
                    )}
                  </>
                ) : (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <Skeleton className="absolute top-0 left-0 w-full h-full" />
                  </div>
                )}
              </div>

              {data ? (
                <div className="flex flex-col items-stretch gap-[10px]">
                  <h1 className="text-3xl mt-5">{data?.name}</h1>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <img className="w-4 h-4" src="/star.png" alt="" />
                      <p>{data?.score?.toFixed(1)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img className="w-4 h-4" src="/calendar.png" alt="" />
                      <p>{data?.year}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {data.tagList.map((tag) => (
                      <button
                        key={tag.id}
                        className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300"
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>

                  <p>{data.introduction}</p>

                  {data.episodeVo.length > 1 && (
                    <div className="flex flex-col items-stretch">
                      <h1 className="text-xl my-3">Episodes</h1>
                      <div className="flex gap-3 overflow-x-auto overflow-y-hidden">
                        {data.episodeVo.map((_, index) => (
                          <Link
                            to={`/tv/${data.id}?episode=${index}`}
                            key={index}
                            className={`px-4 py-[8px] bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${
                              index === episodeIndex
                                ? "!bg-primary text-white"
                                : ""
                            }`}
                          >
                            {index + 1}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Skeleton className="w-[70%] h-8 mt-6" />
                  <Skeleton className="w-[60%] h-8 mt-6" />
                </>
              )}
            </div>

            <div className="flex-shrink-0 md:w-[300px]">
              {data ? (
                <>
                  {data?.refList && data.refList.length > 0 && (
                    <>
                      <h1 className="text-2xl my-3">In the series</h1>
                      <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
                        {data?.refList.map((ref) => (
                          <Link
                            key={ref.id}
                            to={`/${ref.category === 0 ? "movie" : "tv"}/${
                              ref.id
                            }`}
                            className="flex gap-3 pr-2 hover:brightness-[85%] transition duration-300"
                          >
                            <div className="flex-shrink-0 h-[100px] w-[70px]">
                              <ImageFade
                                className="h-full w-full object-cover"
                                src={resizeImage(
                                  ref.coverVerticalUrl,
                                  "",
                                  "100"
                                )}
                                alt=""
                              />
                            </div>
                            <div className="my-2 flex-grow">
                              <p>{ref.name}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}

                  {data?.likeList && data.likeList.length > 0 && (
                    <>
                      <h1 className="text-2xl my-3">Similar to this</h1>
                      <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
                        {data?.likeList.map((like) => (
                          <Link
                            key={like.id}
                            to={`/${like.category === 0 ? "movie" : "tv"}/${
                              like.id
                            }`}
                            className="flex gap-3 pr-2 hover:brightness-[85%] transition duration-300"
                          >
                            <div className="flex-shrink-0 h-[100px] w-[70px]">
                              <ImageFade
                                className="h-full w-full object-cover"
                                src={resizeImage(
                                  like.coverVerticalUrl,
                                  "",
                                  "100"
                                )}
                                alt=""
                              />
                            </div>
                            <div className="my-2 flex-grow">
                              <p>{like.name}</p>

                              <div className="flex items-center gap-2">
                                <img
                                  className="w-4 h-4"
                                  src="/star.png"
                                  alt=""
                                />
                                <p>{like.score?.toFixed(1)}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {[...new Array(2)].map((_, index) => (
                    <div key={index}>
                      <Skeleton className="w-[60%] h-7 my-6" />
                      <div
                        key={index}
                        className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col gap-3"
                      >
                        {[...new Array(10)].map((_, index) => (
                          <div key={index} className="flex gap-3 pr-2">
                            <Skeleton className="h-[100px] w-[70px] flex-shrink-0" />

                            <div className="flex-grow">
                              <Skeleton className="w-full h-4" />
                              <Skeleton className="w-[70%] h-4 mt-3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchView;
