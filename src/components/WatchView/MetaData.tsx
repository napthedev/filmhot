import { DetailType } from "../../shared/types";
import { FC } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

interface MetaDataProps {
  data?: DetailType;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
  return (
    <>
      {data ? (
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
              <Link
                to={`/category/${tag.id}`}
                key={tag.id}
                className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <p>{data.introduction}</p>

          {data.episodeVo.length > 1 && (
            <>
              <h1 className="text-xl my-3">Episodes</h1>
              <div className="flex max-w-[92vw] md:max-w-[calc(88vw-300px)] gap-3 overflow-auto">
                {data.episodeVo.map((_, index) => (
                  <Link
                    to={`/tv/${data.id}?episode=${index}`}
                    key={index}
                    className={`px-4 py-[8px] bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${
                      index === episodeIndex ? "!bg-primary text-white" : ""
                    }`}
                  >
                    {index + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Skeleton className="w-[70%] h-8 mt-6" />
          <Skeleton className="w-[60%] h-8 mt-6" />
        </>
      )}
    </>
  );
};

export default MetaData;
