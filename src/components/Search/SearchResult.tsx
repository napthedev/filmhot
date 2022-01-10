import Error from "../Error";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";
import { resizeImage } from "../../shared/constants";
import { searchWithKeyword } from "../../services/search";
import useSWR from "swr";

interface SearchResultProps {
  query: string;
}

const SearchResult: FC<SearchResultProps> = ({ query }) => {
  const { data, error } = useSWR(`search-${query}`, () =>
    searchWithKeyword(query)
  );

  if (error) return <Error />;

  return (
    <div className="grid gap-6 grid-cols-sm md:grid-cols-lg">
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

export default SearchResult;
