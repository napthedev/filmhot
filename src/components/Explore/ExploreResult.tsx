import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";
import { advanceSearch } from "../../services/explore";
import { resizeImage } from "../../shared/constants";
import useSWR from "swr";

interface ExploreResultProps {
  params: string;
  configs: {
    [key: string]: any;
  };
}

const ExploreResult: FC<ExploreResultProps> = ({ params, configs }) => {
  const { data, error } = useSWR(
    `explore-${params}-${JSON.stringify(configs)}`,
    () => advanceSearch(params, configs)
  );

  if (error) return <div>Error</div>;

  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
    >
      {!data ? (
        <>
          {[...new Array(20)].map((_, index) => (
            <div key={index} className="relative h-0 pb-[163%]">
              <Skeleton className="absolute top-0 left-0 w-full h-full rounded" />
            </div>
          ))}
        </>
      ) : data.length === 0 ? (
        <div>No result found</div>
      ) : (
        <>
          {data.map((item) => (
            <Link
              title={item.name}
              to={
                item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}`
              }
              key={item.id}
              className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                  <LazyLoadImage
                    effect="opacity"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={resizeImage(item.coverVerticalUrl, "250")}
                    alt=""
                  />
                </div>

                <div className="flex-grow flex items-center">
                  <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                    {item.name}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default ExploreResult;
