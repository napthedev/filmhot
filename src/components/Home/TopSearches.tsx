import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";
import { getTopSearched } from "../../services/home";
import { resizeImage } from "../../shared/constants";
import useSWR from "swr";

const TopSearches: FC = () => {
  const { data, error } = useSWR("home-top-searches", () => getTopSearched());

  if (!data || error)
    return (
      <div className="flex flex-col gap-3">
        {[...new Array(Math.round(window.innerHeight / 100))].map(
          (_, index) => (
            <div className="flex gap-2" key={index}>
              <Skeleton className="w-[100px] h-[60px] flex-shrink-0 rounded-lg" />

              <Skeleton className="flex-grow h-4 rounded-md" />
            </div>
          )
        )}
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {data.map((top) => (
        <Link
          to={top.domainType === 0 ? `/movie/${top.id}` : `/tv/${top.id}`}
          className="flex gap-2 hover:brightness-75 transition duration-300"
          key={top.id}
        >
          <div className="w-[100px] h-[60px] flex-shrink-0">
            <LazyLoadImage
              className="w-[100px] h-[60px] object-cover rounded-lg"
              src={resizeImage(top.cover, "100")}
              width={100}
              height={60}
              effect="opacity"
              alt=""
            />
          </div>

          <div>
            <h1>{top.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TopSearches;
