import BannerSlider from "../components/Home/BannerSlider";
import { FC } from "react";
import Search from "../components/Home/Search";
import SectionSlider from "../components/Home/SectionSlider";
import SideBar from "../components/Sidebar";
import Skeleton from "../components/Skeleton";
import SkeletonSlider from "../components/Home/SkeletonSlider";
import TopSearches from "../components/Home/TopSearches";
import { getHome } from "../services/home";
import { resizeImage } from "../shared/constants";
import useSWR from "swr";

const Home: FC = () => {
  const { data, error } = useSWR("home", () => getHome(), {
    revalidateOnFocus: false,
  });

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-grow p-8 overflow-hidden flex flex-col items-stretch">
        {!data || error ? (
          <>
            <div className="relative h-0 pb-[42%]">
              <Skeleton className="absolute top-0 left-0 w-full h-full rounded-2xl" />
            </div>
            <Skeleton className="my-8 h-6 w-full max-w-[200px]" />

            <div className="overflow-hidden">
              <SkeletonSlider />
            </div>
          </>
        ) : (
          <>
            <div className="overflow-hidden">
              <BannerSlider
                images={
                  data
                    .find((item) => item.homeSectionType === "BANNER")
                    ?.recommendContentVOList.map((item) => ({
                      title: item.title,
                      image: item.imageUrl,
                      link: "",
                    })) || []
                }
              />
            </div>
            {data
              .filter((item) => item.homeSectionType !== "BANNER")
              .map((section) => (
                <div key={section.homeSectionId}>
                  <h1 className="text-2xl mb-3 mt-8">
                    {section.homeSectionName.replace("on Loklok", "")}
                  </h1>

                  <SectionSlider
                    images={section.recommendContentVOList.map((item) => ({
                      title: item.title,
                      image: resizeImage(item.imageUrl, "200"),
                      link: "",
                    }))}
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
  );
};

export default Home;
