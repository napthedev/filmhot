import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "../Skeleton";
import { getTopSearched } from "../../services/home";
import { resizeImage } from "../../shared/constants";
import useSWR from "swr";

const TopSearches: FC = () => {
  const { data, error } = useSWR("home-top-searches", () => getTopSearched());

  if (!data || error) return <div></div>;

  return (
    <div className="flex flex-col gap-3">
      {data.map((top) => (
        <div className="flex gap-2" key={top.id}>
          <div className="w-[100px] h-[60px] flex-shrink-0">
            <LazyLoadImage
              className="w-[100px] h-[60px] object-cover"
              src={resizeImage(top.cover, "100")}
              width={100}
              height={60}
              alt=""
            />
          </div>

          <div>
            <h1>{top.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSearches;
