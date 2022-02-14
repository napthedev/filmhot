import { FC, Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import BannerSlider from "../components/Home/BannerSlider";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "../components/Search/SearchBox";
import SectionSlider from "../components/Home/SectionSlider";
import SideBar from "../components/Sidebar";
import Skeleton from "../components/Skeleton";
import SkeletonSlider from "../components/Home/SkeletonSlider";
import Title from "../components/Title";
import TopSearches from "../components/Home/TopSearches";
import { getHome } from "../services/home";
import { resizeImage } from "../shared/constants";
import useSWRInfinite from "swr/infinite";

const Home: FC = () => {
  const getKey = (index: number) => `home-${index || 0}`;

  const { data, error, setSize } = useSWRInfinite(
    getKey,
    (key) => getHome(Number(key.split("-").slice(-1)[0])),
    { revalidateFirstPage: false }
  );

  const [sidebarActive, setSidebarActive] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  return (
    <>
      <Title value="FilmHot - AdFree Movie / Anime Watching Website" />

      <div className="flex sm:hidden justify-between px-[4vw] mt-6">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 h-8" src="/icon.png" alt="" />
          <span className="text-xl font-medium">FilmHot</span>
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      <div className="flex">
        <SideBar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />

        <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          {!data || error ? (
            <>
              <div className="relative h-0 pb-[42%] mt-8">
                <Skeleton className="absolute top-0 left-0 w-full h-full rounded-2xl" />
              </div>
              {[...new Array(2)].map((_, index) => (
                <Fragment key={index}>
                  <Skeleton className="my-8 h-6 w-full max-w-[200px]" />

                  <div className="overflow-hidden">
                    <SkeletonSlider />
                  </div>
                </Fragment>
              ))}
            </>
          ) : (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => setSize((prev) => prev + 1)}
              hasMore={!error && data?.slice(-1)?.[0]?.length !== 0}
              loader={
                <>
                  <Skeleton className="my-8 h-6 w-full max-w-[200px]" />
                  <div className="overflow-hidden">
                    <SkeletonSlider />
                  </div>
                </>
              }
            >
              {data
                .reduce((acc, current) => [...acc, ...current], [])
                .map((section) =>
                  section.homeSectionType === "BANNER" ? (
                    <div
                      key={section.homeSectionId}
                      className="overflow-hidden w-full mt-8"
                    >
                      <BannerSlider
                        images={
                          (section.recommendContentVOList
                            .map((item) => {
                              const searchParams = new URLSearchParams(
                                new URL(item.jumpAddress).search
                              );

                              if (!searchParams.get("id")) return null;

                              return {
                                title: item.title,
                                image: item.imageUrl,
                                link:
                                  searchParams.get("type") === "0"
                                    ? `/movie/${searchParams.get("id")}`
                                    : `/tv/${searchParams.get("id")}`,
                              };
                            })
                            .filter(Boolean) as {
                            title: string;
                            image: string;
                            link: string;
                          }[]) || []
                        }
                      />
                    </div>
                  ) : (
                    <div key={section.homeSectionId}>
                      <h1 className="text-2xl mb-3 mt-8">
                        {section.homeSectionName.replace("on Loklok", "")}
                      </h1>

                      <SectionSlider
                        images={section.recommendContentVOList.map((item) => {
                          const searchParams = new URLSearchParams(
                            new URL(item.jumpAddress).search
                          );

                          return {
                            title: item.title,
                            image: resizeImage(item.imageUrl, "200"),
                            link:
                              searchParams.get("type") === "0"
                                ? `/movie/${searchParams.get("id")}`
                                : `/tv/${searchParams.get("id")}`,
                          };
                        })}
                        coverType={section.coverType}
                      />
                    </div>
                  )
                )}
            </InfiniteScroll>
          )}
        </div>

        <div className="flex-shrink-0 w-[350px] p-8 sticky top-0 h-screen scrollbar overflow-hidden overflow-y-auto hidden md:block">
          <SearchBox />
          <h1 className="text-xl my-6">Top Searches</h1>
          <TopSearches />
        </div>
      </div>
    </>
  );
};

export default Home;
