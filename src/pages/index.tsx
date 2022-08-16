import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { InView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

import BannerSlider from "@/components/Home/BannerSlider";
import InfiniteLoader from "@/components/Home/InfiniteLoader";
import SectionSlider from "@/components/Home/SectionSlider";
import Sidebar from "@/components/Layout/Sidebar";
import SearchBox from "@/components/Search/SearchBox";
import TopSearches from "@/components/Search/TopSearches";
import { getTopSearches } from "@/services/search";

import { getHome, getHomeFromClient } from "../services/home";

const Home: NextPage<HomeProps> = ({ initialData, topSearches }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const { data, setSize, size } = useSWRInfinite(
    (index: number) => `${index || 0}`,
    (key) => getHomeFromClient(Number(key)),
    {
      revalidateFirstPage: false,
      fallbackData: [initialData!],
      revalidateAll: false,
    }
  );

  return (
    <>
      <div className="flex sm:hidden justify-between px-[4vw] mt-6">
        <Link href="/">
          <a className="flex items-center gap-2">
            <img className="w-8 h-8" src="/icon.png" alt="" />
            <span className="text-xl font-medium">FilmHot</span>
          </a>
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <FaBars className="w-6 h-6 fill-white" />
        </button>
      </div>

      <div className="flex">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />

        <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          {data?.flat().map((section) =>
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
                              : `/tv/${searchParams.get("id")}/0`,
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
                      image: item.imageUrl,
                      link:
                        searchParams.get("type") === "0"
                          ? `/movie/${searchParams.get("id")}`
                          : `/tv/${searchParams.get("id")}/0`,
                    };
                  })}
                  coverType={section.coverType}
                />
              </div>
            )
          )}

          {data?.slice(-1)?.[0]?.length !== 0 && (
            <InView
              onChange={(inView) => {
                if (
                  inView &&
                  data?.length === size &&
                  data?.slice(-1)?.[0]?.length !== 0
                ) {
                  setSize((prev) => prev + 1);
                }
              }}
              rootMargin="0px 0px 1000px 0px"
              threshold={[0, 0.25, 0.5, 0.75, 1]}
            >
              {({ ref }) => <InfiniteLoader forwardedRef={ref} />}
            </InView>
          )}
        </div>

        <div className="flex-shrink-0 w-[350px] p-8 sticky top-0 h-screen scrollbar overflow-hidden overflow-y-auto hidden md:block">
          <SearchBox />
          <h1 className="text-xl my-6">Top Searches</h1>
          <TopSearches topSearches={topSearches!} />
        </div>
      </div>
    </>
  );
};

export default Home;

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  try {
    const [initialData, topSearches] = await Promise.all([
      getHome(),
      getTopSearches(),
    ]);

    return {
      props: {
        initialData,
        topSearches,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: true,
    };
  }
};
