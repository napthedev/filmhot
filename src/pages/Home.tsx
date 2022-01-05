import { FC, Fragment } from "react";

import BannerSlider from "../components/Home/BannerSlider";
import Search from "../components/Search";
import SectionSlider from "../components/Home/SectionSlider";
import SideBar from "../components/Sidebar";
import Skeleton from "../components/Skeleton";
import SkeletonSlider from "../components/Home/SkeletonSlider";
import Title from "../components/Title";
import TopSearches from "../components/Home/TopSearches";
import { getHome } from "../services/home";
import { resizeImage } from "../shared/constants";
import useSWR from "swr";

const Home: FC = () => {
  const { data, error } = useSWR("home", () => getHome());

  return (
    <>
      <Title value="FilmHot - AdFree Movie / Anime Watching Website" />
      <div className="flex">
        <SideBar />

        <div className="flex-grow p-8 overflow-hidden flex flex-col items-stretch">
          {!data || error ? (
            <>
              <div className="relative h-0 pb-[42%]">
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
            <>
              {data.length === 0 && (
                <div className="flex flex-col min-h-screen items-center justify-center">
                  <img
                    src="https://ik.imagekit.io/nap/404_rNQi0QbcO.png?tr=w-600"
                    alt=""
                  />
                  <h1 className="text-3xl">No Data Found</h1>
                </div>
              )}
              {data.length > 0 && (
                <div className="overflow-hidden">
                  <BannerSlider
                    images={
                      data
                        .find((item) => item.homeSectionType === "BANNER")
                        ?.recommendContentVOList.map((item) => {
                          const searchParams = new URLSearchParams(
                            new URL(item.jumpAddress).search
                          );

                          return {
                            title: item.title,
                            image: item.imageUrl,
                            link:
                              searchParams.get("type") === "0"
                                ? `/movie/${searchParams.get("id")}`
                                : `/tv/${searchParams.get("id")}`,
                          };
                        }) || []
                    }
                  />
                </div>
              )}
              {data
                .filter((item) => item.homeSectionType !== "BANNER")
                .map((section) => (
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
                    />
                  </div>
                ))}
            </>
          )}
        </div>

        <div className="flex-shrink-0 w-[350px] p-8 sticky top-0 h-screen scrollbar overflow-hidden overflow-y-auto">
          <Search />
          <h1 className="text-xl my-6">Top Searches</h1>
          <TopSearches />
        </div>
      </div>
    </>
  );
};

export default Home;
