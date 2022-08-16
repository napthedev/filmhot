import Link from "next/link";
import { FC } from "react";

import { TopSearches } from "@/types/search";

import ImageFade from "../Shared/ImageFade";

interface TopSearchesProps {
  topSearches: TopSearches;
}

const TopSearches: FC<TopSearchesProps> = ({ topSearches }) => {
  return (
    <div className="flex flex-col gap-3">
      {topSearches.map((item) => (
        <Link
          href={
            item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}/0`
          }
          key={item.id}
        >
          <a className="flex gap-2 hover:brightness-75 transition duration-300">
            <div className="w-[100px] h-[60px] flex-shrink-0">
              <ImageFade
                src={item.cover}
                className="w-[100px] h-[60px] object-cover rounded-lg"
                width={100}
                height={60}
                alt=""
              />
            </div>

            <div>
              <h1>{item.title}</h1>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TopSearches;
