import { Link, useParams } from "react-router-dom";

import DesktopPlayer from "../components/Player/Desktop";
import { FC } from "react";
import ImageFade from "../components/ImageFade";
import MobilePlayer from "../components/Player/Mobile";
import Search from "../components/Search";
import Skeleton from "../components/Skeleton";
import Title from "../components/Title";
import { getMovieDetail } from "../services/movie";
import { isMobile } from "../shared/utils";
import { resizeImage } from "../shared/constants";
import useSWR from "swr";

const Info: FC = () => {
  const { id } = useParams();

  const { data, error } = useSWR(`movie-${id}`, () =>
    getMovieDetail(id as string)
  );

  if (error) return <h1>Error</h1>;

  return (
    <>
      {data && <Title value={`Watch ${data.data.name} - FilmHot`} />}
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
            <div className="flex flex-col items-stretch w-full">
              <div className="w-full">
                {data ? (
                  <>
                    {isMobile() ? (
                      <MobilePlayer
                        sources={data.sources}
                        subtitles={data.subtitles}
                      />
                    ) : (
                      <DesktopPlayer
                        sources={data.sources}
                        subtitles={data.subtitles}
                      />
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
                  <h1 className="text-3xl mt-5">{data?.data.name}</h1>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <img className="w-4 h-4" src="/star.png" alt="" />
                      <p>{data?.data.score.toFixed(1)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img className="w-4 h-4" src="/calendar.png" alt="" />
                      <p>{data?.data.year}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {data.data.tagList.map((tag) => (
                      <button className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300">
                        {tag.name}
                      </button>
                    ))}
                  </div>

                  <p>{data.data.introduction}</p>
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
                  {data?.data.refList && data.data.refList.length > 0 && (
                    <>
                      <h1 className="text-2xl my-3">In the series</h1>
                      <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
                        {data?.data.refList.map((ref) => (
                          <Link
                            to={`/movie/${ref.id}`}
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

                  {data?.data.likeList && data.data.likeList.length > 0 && (
                    <>
                      <h1 className="text-2xl my-3">Similar to this</h1>
                      <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
                        {data?.data.likeList.map((like) => (
                          <Link
                            to={`/movie/${like.id}`}
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
                                <p>{like.score.toFixed(1)}</p>
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

export default Info;
