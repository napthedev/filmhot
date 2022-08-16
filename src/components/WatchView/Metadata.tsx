import classNames from "classnames";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";

import { MovieDetail } from "@/types/movie";

interface MetaDataProps {
  data: MovieDetail;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
  const lastEpisodeRef = useRef<HTMLAnchorElement | null>(null);

  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (lastEpisodeRef.current) {
      if (lastEpisodeRef.current.offsetTop > 0) {
        setShowLoadMoreButton(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-[10px]">
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
          <Link href={`/category/${tag.id}`} key={tag.id}>
            <a className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300">
              {tag.name}
            </a>
          </Link>
        ))}
      </div>

      <p>{data.introduction}</p>

      {data.episodeVo > 1 && (
        <>
          <h1 className="text-xl my-3">Episodes</h1>
          <div
            className={classNames("flex flex-wrap gap-3 relative", {
              "before:absolute before:bg-gradient-to-b before:from-[#00000000] before:to-dark before:top-10 before:w-full before:left-0 before:h-8 max-h-[68px] overflow-hidden":
                showLoadMoreButton && !isExpanded,
            })}
          >
            {new Array(data.episodeVo).fill("").map((_, index) => (
              <Link href={`/tv/${data.id}/${index}`} key={index}>
                <a
                  {...(index === data.episodeVo - 1
                    ? { ref: lastEpisodeRef }
                    : {})}
                  className={classNames(
                    "px-4 h-[42px] flex items-center bg-dark-lighten rounded hover:brightness-125 transition duration-300",
                    {
                      "!bg-primary text-white": index === episodeIndex,
                    }
                  )}
                >
                  {index + 1}
                </a>
              </Link>
            ))}
          </div>
          {showLoadMoreButton && (
            <div>
              <button
                className="text-primary"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MetaData;
