import Link from "next/link";
import { FC } from "react";

import { MovieDetail } from "@/types/movie";

interface MetaDataProps {
  data: MovieDetail;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
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

      {data.episodeVo.length > 1 && (
        <>
          <h1 className="text-xl my-3">Episodes</h1>
          <div className="flex max-w-[92vw] md:max-w-[calc(88vw-300px)] gap-3 overflow-auto">
            {data.episodeVo.map((_, index) => (
              <Link href={`/tv/${data.id}?episode=${index}`} key={index}>
                <a
                  className={`px-4 py-[8px] bg-dark-lighten rounded hover:brightness-125 transition duration-300 ${
                    index === episodeIndex ? "!bg-primary text-white" : ""
                  }`}
                >
                  {index + 1}
                </a>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MetaData;
