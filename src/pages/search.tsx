import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { FC } from "react";

import ImageFade from "@/components/Shared/ImageFade";
import Meta from "@/components/Shared/Meta";
import { getTopSearches, searchWithKeyword } from "@/services/search";

import NavBar from "../components/Layout/Navbar";
import SearchBox from "../components/Search/SearchBox";
import TopSearches from "../components/Search/TopSearches";

const Search: FC<SearchProps> = ({ result, topSearches, query }) => {
  if (topSearches)
    return (
      <>
        <Meta
          title="Search - Filmhot"
          description="FilmHot - AdFree Movie / Anime Watching Website"
          image="/preview.png"
        />
        <div className="flex justify-center my-[100px] mx-6">
          <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
            <div className="flex flex-col items-stretch gap-3">
              <h1 className="text-2xl">Search for your favorite movies</h1>
              <SearchBox autoFocus />
            </div>

            <div className="mt-8 w-full">
              <h1 className="text-lg mb-3">Popular Searches</h1>
              <TopSearches topSearches={topSearches} />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Meta
        title={`Search for '${query}' - Filmhot`}
        description="FilmHot - AdFree Movie / Anime Watching Website"
        image="/preview.png"
      />
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div>
          <h1 className="mb-6 text-3xl">Search result for {`'${query}'`}</h1>
          {result.length === 0 ? (
            <div className="text-center my-6">No result found</div>
          ) : (
            <div className="grid gap-6 grid-cols-sm md:grid-cols-lg">
              {result.map((item) => (
                <Link
                  href={
                    item.domainType === 0
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}/0`
                  }
                  key={item.id}
                >
                  <a className="relative h-0 pb-[163%] bg-dark-lighten rounded overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                      <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                        <ImageFade
                          width={250}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          src={item.coverVerticalUrl}
                          alt=""
                        />
                      </div>

                      <div className="flex-grow flex items-center">
                        <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                          {item.name}
                        </h1>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

type SearchProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const q = query.q;

  if (!q || typeof q !== "string") {
    const topSearches = await getTopSearches();

    return {
      props: {
        topSearches,
      },
    };
  }

  const result = await searchWithKeyword(q);

  return {
    props: {
      result,
      query: q.trim(),
    },
  };
};
