import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Title from "../Title";
import { getCategoryItems } from "../../services/category";
import { resizeImage } from "../../shared/constants";
import useInfiniteSWR from "swr/infinite";

interface CategoryResultProps {
  id: string;
  categoryName: string;
}

const CategoryResult: FC<CategoryResultProps> = ({ id, categoryName }) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && previousPageData.length === 0) return null;

    return `${(pageIndex + 1) * 30}-${id}`;
  };

  const { data, error, setSize } = useInfiniteSWR(getKey, (limit) =>
    getCategoryItems(id, Number(limit.split("-")[0]))
  );

  return (
    <>
      <Title value={`Category ${categoryName} - FilmHot`} />
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={() => setSize((size) => size + 1)}
        hasMore={!error}
        loader={
          <div className="flex justify-center w-full">
            <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin my-10"></div>
          </div>
        }
        endMessage={
          <p className="text-center">
            <b>Nothing more to see</b>
          </p>
        }
      >
        <div className="flex justify-center mx-[7vw]">
          <div className="w-full grid grid-cols-sm md:grid-cols-lg gap-6">
            {data?.slice(-1)?.[0].map((item) => (
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
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default CategoryResult;
