import { FC } from "react";
import NavBar from "../components/NavBar";
import SearchBox from "../components/Search/SearchBox";
import SearchResult from "../components/Search/SearchResult";
import Title from "../components/Title";
import { useQueryParams } from "../hooks/useQueryParams";

const Search: FC = () => {
  const queryParams = useQueryParams();
  const query = queryParams.get("q");

  if (!query?.trim())
    return (
      <>
        <Title value="Search - FilmHot" />
        <div className="flex justify-center mx-4 my-[200px]">
          <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
            <h1 className="text-2xl">Search for your favorite movies</h1>
            <SearchBox />
          </div>
        </div>
      </>
    );

  return (
    <>
      <Title value={`Search for ${query} - FilmHot`} />
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div>
          <h1 className="mb-6 text-3xl">Search result for {query}</h1>
        </div>
        <SearchResult query={query} />
      </div>
    </>
  );
};

export default Search;
